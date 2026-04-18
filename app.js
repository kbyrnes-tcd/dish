const express = require("express");
const session = require("express-session");
const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const DBCONFIG = require("./utils/DBCONFIG");

const app = express();
const PORT = 8000;
const RESET_LINK_MINUTES = 30;
const LIVE_SERVER_ORIGINS = new Set([
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]);

console.log("APP FILE LOADED");

const pool = mysql.createPool({
    ...DBCONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.query(
    `CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id INT UNSIGNED NOT NULL,
        token_hash VARCHAR(64) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY token_hash (token_hash),
        KEY user_id (user_id),
        CONSTRAINT password_reset_tokens_ibfk_1
            FOREIGN KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
    (err) => {
        if (err) {
            console.error("Password reset table setup error:", err);
        }
    }
);

function getSiteUrl(req) {
    const origin = req.get("origin");
    return LIVE_SERVER_ORIGINS.has(origin) ? origin : "http://127.0.0.1:5500";
}

function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

// Allow requests from Live Server frontend
app.use((req, res, next) => {
    const origin = req.get("origin");

    if (LIVE_SERVER_ORIGINS.has(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    } else {
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

//add session middleware
app.use(session({
    secret: "dish-secret-key-change-this-later",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //true only with HTTPS
        httpOnly: true,
        sameSite: "lax"
    }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname));

// Pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/new-dish.html", (req, res) => {
    res.sendFile(path.join(__dirname, "new-dish.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

// API health check
app.get("/api/health", (req, res) => {
    res.json({ message: "API is running" });
});

// Test DB connection
app.get("/api/test-db", (req, res) => {
    pool.query("SELECT 1 AS test", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Database connection successful",
            result
        });
    });
});

// Get all dishes
app.get("/api/dishes", (req, res) => {
    pool.query("SELECT * FROM dishes", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// Get all restaurants
app.get("/api/restaurants", (req, res) => {
    pool.query(
        "SELECT * FROM restaurants ORDER BY restaurant_name ASC",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(results);
        }
    );
});

// Get all users (without passwords)
app.get("/api/users", (req, res) => {
    pool.query(
        `SELECT id, username, user_email, user_xp, user_level, created_at
         FROM users
         ORDER BY username ASC`,
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(results);
        }
    );
});

// Get all reviews
app.get("/api/reviews", (req, res) => {
    pool.query(
        "SELECT * FROM reviews ORDER BY id DESC",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(results);
        }
    );
});

// Get all user dish assignments
app.get("/api/user-dishes", (req, res) => {
    pool.query(
        "SELECT * FROM user_dishes ORDER BY assigned_at DESC",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(results);
        }
    );
});

// Check whether username already exists
console.log("About to register /api/auth/check-username route");

app.get("/api/auth/check-username", (req, res) => {
    let { username } = req.query;

    username = username?.trim();

    if (!username) {
        return res.status(400).json({
            message: "Username is required."
        });
    }

    pool.query(
        "SELECT id FROM users WHERE username = ?",
        [username],
        (err, results) => {
            if (err) {
                console.error("Check username error:", err);
                return res.status(500).json({
                    message: "Server error while checking username."
                });
            }

            return res.json({
                exists: results.length > 0
            });
        }
    );
});

// Register a new user
console.log("About to register /api/auth/register route");

app.post("/api/auth/register", async (req, res) => {
    let { username, email, password } = req.body;

    username = username?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, email, and password are required."
        });
    }

    const usernamePattern = /^[A-Za-z0-9_-]+$/;

    if (!usernamePattern.test(username)) {
        return res.status(400).json({
            message: "Username can only contain letters, numbers, hyphens, and underscores."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long."
        });
    }

    try {
        pool.query(
            "SELECT id, username, user_email FROM users WHERE user_email = ? OR username = ?",
            [email, username],
            async (selectErr, results) => {
                if (selectErr) {
                    console.error("Register select error:", selectErr);
                    return res.status(500).json({
                        message: "Server error while checking existing user."
                    });
                }

                if (results.length > 0) {
                    const existingUser = results[0];

                    if (existingUser.user_email === email) {
                        return res.status(400).json({
                            message: "An account with this email already exists."
                        });
                    }

                    if (existingUser.username === username) {
                        return res.status(400).json({
                            message: "Username already exists."
                        });
                    }
                }

                try {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    pool.query(
                        `INSERT INTO users (username, user_email, user_password)
                         VALUES (?, ?, ?)`,
                        [username, email, hashedPassword],
                        (insertErr, insertResult) => {
                            if (insertErr) {
                                console.error("Register insert error:", insertErr);
                                return res.status(500).json({
                                    message: "Server error while creating account."
                                });
                            }

                            // Set session userId to log in the user immediately after registration
                            req.session.userId = insertResult.insertId;

                            return res.status(201).json({
                                message: "Account created successfully.",
                                userId: insertResult.insertId
                            });
                        }
                    );
                } catch (hashErr) {
                    console.error("Password hash error:", hashErr);
                    return res.status(500).json({
                        message: "Server error while securing password."
                    });
                }
            }
        );
    } catch (error) {
        console.error("Register route error:", error);
        return res.status(500).json({
            message: "Unexpected server error."
        });
    }
});

// Login a user
console.log("About to register /api/auth/login route");

app.post("/api/auth/login", async (req, res) => {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    try {
        pool.query(
            "SELECT id, username, user_email, user_password, user_xp, user_level, created_at FROM users WHERE user_email = ?",
            [email],
            async (selectErr, results) => {
                if (selectErr) {
                    console.error("Login select error:", selectErr);
                    return res.status(500).json({
                        message: "Server error while checking login."
                    });
                }

                if (results.length === 0) {
                    return res.status(400).json({
                        message: "Invalid email or password."
                    });
                }

                const user = results[0];

                try {
                    const isPasswordMatch = await bcrypt.compare(password, user.user_password);

                    if (!isPasswordMatch) {
                        return res.status(400).json({
                            message: "Invalid email or password."
                        });
                    }

                    req.session.userId = user.id;

                    return res.status(200).json({
                        message: "Login successful.",
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.user_email,
                            xp: user.user_xp,
                            level: user.user_level,
                            created_at: user.created_at
                        }
                    });
                } catch (compareErr) {
                    console.error("Password compare error:", compareErr);
                    return res.status(500).json({
                        message: "Server error while verifying password."
                    });
                }
            }
        );
    } catch (error) {
        console.error("Login route error:", error);
        return res.status(500).json({
            message: "Unexpected server error."
        });
    }
});

// Request a password reset link
console.log("About to register /api/auth/forgot-password route");

app.post("/api/auth/forgot-password", (req, res) => {
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    if (!email) {
        return res.status(400).json({
            message: "Email is required."
        });
    }

    pool.query(
        "SELECT id, user_email FROM users WHERE user_email = ?",
        [email],
        (selectErr, results) => {
            if (selectErr) {
                console.error("Forgot password select error:", selectErr);
                return res.status(500).json({
                    message: "Server error while checking account."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "No account found with that email address."
                });
            }

            const user = results[0];
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = hashToken(token);
            const expiresAt = new Date(Date.now() + RESET_LINK_MINUTES * 60 * 1000);

            pool.query(
                "DELETE FROM password_reset_tokens WHERE user_id = ?",
                [user.id],
                (deleteErr) => {
                    if (deleteErr) {
                        console.error("Forgot password delete token error:", deleteErr);
                        return res.status(500).json({
                            message: "Server error while preparing reset link."
                        });
                    }

                    pool.query(
                        `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
                         VALUES (?, ?, ?)`,
                        [user.id, tokenHash, expiresAt],
                        (insertErr) => {
                            if (insertErr) {
                                console.error("Forgot password insert token error:", insertErr);
                                return res.status(500).json({
                                    message: "Server error while creating reset link."
                                });
                            }

                            const resetLink = `${getSiteUrl(req)}/reset-password.html?token=${token}`;

                            console.log(`Password reset link for ${user.user_email}: ${resetLink}`);

                            return res.status(200).json({
                                message: "Password reset link created.",
                                resetLink
                            });
                        }
                    );
                }
            );
        }
    );
});

// Reset password using a reset token
console.log("About to register /api/auth/reset-password route");

app.post("/api/auth/reset-password", async (req, res) => {
    let { token, password } = req.body;

    token = token?.trim();
    password = password?.trim();

    if (!token || !password) {
        return res.status(400).json({
            message: "Reset token and new password are required."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long."
        });
    }

    try {
        const tokenHash = hashToken(token);

        pool.query(
            `SELECT id, user_id
             FROM password_reset_tokens
             WHERE token_hash = ? AND expires_at > NOW()`,
            [tokenHash],
            async (selectErr, results) => {
                if (selectErr) {
                    console.error("Reset password token select error:", selectErr);
                    return res.status(500).json({
                        message: "Server error while checking reset link."
                    });
                }

                if (results.length === 0) {
                    return res.status(400).json({
                        message: "Reset link is invalid or has expired."
                    });
                }

                const resetToken = results[0];

                try {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    pool.query(
                        "UPDATE users SET user_password = ? WHERE id = ?",
                        [hashedPassword, resetToken.user_id],
                        (updateErr) => {
                            if (updateErr) {
                                console.error("Reset password update error:", updateErr);
                                return res.status(500).json({
                                    message: "Server error while updating password."
                                });
                            }

                            pool.query(
                                "DELETE FROM password_reset_tokens WHERE user_id = ?",
                                [resetToken.user_id],
                                (deleteErr) => {
                                    if (deleteErr) {
                                        console.error("Reset password cleanup error:", deleteErr);
                                    }

                                    return res.status(200).json({
                                        message: "Password updated successfully."
                                    });
                                }
                            );
                        }
                    );
                } catch (hashErr) {
                    console.error("Reset password hash error:", hashErr);
                    return res.status(500).json({
                        message: "Server error while securing new password."
                    });
                }
            }
        );
    } catch (error) {
        console.error("Reset password route error:", error);
        return res.status(500).json({
            message: "Unexpected server error."
        });
    }
});

// Recommend a dish
console.log("About to register /api/dishes/recommend route");

app.post("/api/dishes/recommend", (req, res) => {
    console.log("recommend route hit");
    console.log("body received:", req.body);

    const { cuisine, location, price_range, course_type } = req.body;

    let query = `
        SELECT 
            d.id AS dish_id,
            d.dish_name,
            r.restaurant_name,
            r.restaurant_location,
            r.restaurant_price,
            r.restaurant_cuisine,
            rd.course_type
        FROM restaurants_dishes rd
        JOIN dishes d ON rd.dishes_id = d.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        WHERE 1=1
    `;

    const values = [];

    if (cuisine) {
        query += " AND r.restaurant_cuisine = ?";
        values.push(cuisine);
    }

    if (location) {
        query += " AND r.restaurant_location LIKE ?";
        values.push(`%${location}%`);
    }

    if (price_range) {
        query += " AND r.restaurant_price = ?";
        values.push(price_range);
    }

    if (course_type) {
        query += " AND rd.course_type = ?";
        values.push(course_type);
    }

    query += " ORDER BY RAND() LIMIT 1";

    console.log("query:", query);
    console.log("values:", values);

    pool.query(query, values, (err, results) => {
        if (err) {
            console.error("Recommendation query error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No dishes found" });
        }

        res.json(results[0]);
    });
});

//current user route
console.log("About to register /api/auth/me route");

app.get("/api/auth/me", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not logged in."
        });
    }

    pool.query(
        `SELECT id, username, user_email, user_xp, user_level, created_at
         FROM users
         WHERE id = ?`,
        [req.session.userId],
        (err, results) => {
            if (err) {
                console.error("Auth me error:", err);
                return res.status(500).json({
                    message: "Server error while fetching current user."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "User not found."
                });
            }

            const user = results[0];

            return res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.user_email,
                    xp: user.user_xp,
                    level: user.user_level,
                    created_at: user.created_at
                }
            });
        }
    );
});

//log out route
console.log("About to register /api/auth/logout route");

app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({
                message: "Failed to log out."
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            message: "Logged out successfully."
        });
    });
});

app.listen(PORT, () => {
    console.log(`App running on http://127.0.0.1:${PORT}`);
});
