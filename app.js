const express = require("express");
const session = require("express-session");
const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const DBCONFIG = require("./utils/DBCONFIG");
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "You must be logged in."
        });
    }

    next();
}

const app = express();
const PORT = 8000;

console.log("APP FILE LOADED");

const pool = mysql.createPool({
    ...DBCONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Allow requests from Live Server frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
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

// Recommend a dish
console.log("About to register /api/dishes/recommend route");

app.post("/api/dishes/recommend", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "You must be logged in to get a dish recommendation."
        });
    }

    console.log("recommend route hit");
    console.log("body received:", req.body);

    const userId = req.session.userId;
    const { cuisine, location, price_range, course_type } = req.body;

    let query = `
        SELECT 
            rd.id AS dish_id,
            d.dish_name,
            r.restaurant_name,
            r.restaurant_location,
            r.restaurant_address,
            r.restaurant_price,
            r.restaurant_cuisine,
            rd.course_type
        FROM restaurants_dishes rd
        JOIN dishes d ON rd.dishes_id = d.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        WHERE rd.id NOT IN (
            SELECT ud.dish_id
            FROM user_dishes ud
            WHERE ud.user_id = ?
        )
    `;

    const values = [userId];

    if (cuisine) {
        query += " AND r.restaurant_cuisine = ?";
        values.push(cuisine);
    }

    if (location) {
        query += " AND r.restaurant_location = ?";
        values.push(location);
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
            return res.status(404).json({
                message: "No dishes found that match your filters and haven't already been assigned."
            });
        }

        res.json(results[0]);
    });
});

// save a recommended dish to the logged-in user
console.log("About to register /api/user-dishes route");

app.post("/api/user-dishes", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "You must be logged in to save dishes."
        });
    }

    const userId = req.session.userId;
    const { dish_id } = req.body;

    if (!dish_id) {
        return res.status(400).json({
            message: "Dish ID is required."
        });
    }

    pool.query(
        `INSERT INTO user_dishes (user_id, dish_id, dish_status)
         VALUES (?, ?, 'assigned')`,
        [userId, dish_id],
        (err, result) => {
            if (err) {
                console.error("Save user dish error:", err);
                return res.status(500).json({
                    message: "Failed to save dish to user profile."
                });
            }

            return res.status(201).json({
                message: "Dish saved successfully.",
                userDishId: result.insertId
            });
        }
    );
});

// Get current assigned dish for logged-in user
console.log("About to register /api/user-dishes/current route");

app.get("/api/user-dishes/current", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not logged in."
        });
    }

    const userId = req.session.userId;

    pool.query(
        `
        SELECT 
            ud.id AS user_dish_id,
            ud.dish_status,
            ud.assigned_at,
            ud.completed_at,
            rd.id AS dish_id,
            d.dish_name,
            r.restaurant_name,
            r.restaurant_location,
            r.restaurant_address,
            r.restaurant_price,
            r.restaurant_cuisine,
            rd.course_type
        FROM user_dishes ud
        JOIN restaurants_dishes rd ON ud.dish_id = rd.id
        JOIN dishes d ON rd.dishes_id = d.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        WHERE ud.user_id = ?
          AND ud.dish_status = 'assigned'
        ORDER BY ud.assigned_at DESC
        LIMIT 1
        `,
        [userId],
        (err, results) => {
            if (err) {
                console.error("Current dish query error:", err);
                return res.status(500).json({
                    message: "Failed to fetch current dish."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "No current dish found."
                });
            }

            res.json(results[0]);
        }
    );
});

// Get completed dish history for logged-in user
console.log("About to register /api/user-dishes/history route");

app.get("/api/user-dishes/history", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not logged in."
        });
    }

    const userId = req.session.userId;

    pool.query(
        `
        SELECT 
            ud.id AS user_dish_id,
            ud.dish_status,
            ud.assigned_at,
            ud.completed_at,
            rd.id AS dish_id,
            d.dish_name,
            r.restaurant_name,
            r.restaurant_location,
            r.restaurant_address,
            r.restaurant_price,
            r.restaurant_cuisine,
            rd.course_type
        FROM user_dishes ud
        JOIN restaurants_dishes rd ON ud.dish_id = rd.id
        JOIN dishes d ON rd.dishes_id = d.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        WHERE ud.user_id = ?
          AND ud.dish_status = 'completed'
        ORDER BY ud.completed_at DESC, ud.assigned_at DESC
        `,
        [userId],
        (err, results) => {
            if (err) {
                console.error("History query error:", err);
                return res.status(500).json({
                    message: "Failed to fetch dish history."
                });
            }

            res.json(results);
        }
    );
});

//mark current dish as completed
console.log("About to register /api/user-dishes/:id/complete route");

app.patch("/api/user-dishes/:id/complete", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not logged in."
        });
    }

    const userId = req.session.userId;
    const userDishId = req.params.id;

    pool.query(
        `
        SELECT 
            ud.id,
            ud.user_id,
            ud.dish_status,
            r.restaurant_price
        FROM user_dishes ud
        JOIN restaurants_dishes rd ON ud.dish_id = rd.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        WHERE ud.id = ?
          AND ud.user_id = ?
          AND ud.dish_status = 'assigned'
        LIMIT 1
        `,
        [userDishId, userId],
        (selectErr, results) => {
            if (selectErr) {
                console.error("Complete dish select error:", selectErr);
                return res.status(500).json({
                    message: "Failed to find assigned dish."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Assigned dish not found."
                });
            }

            const row = results[0];

            let xpToAdd = 0;
            if (row.restaurant_price === "€") xpToAdd = 50;
            if (row.restaurant_price === "€€") xpToAdd = 100;
            if (row.restaurant_price === "€€€") xpToAdd = 150;

            pool.query(
                `
                UPDATE user_dishes
                SET dish_status = 'completed',
                    completed_at = CURRENT_TIMESTAMP
                WHERE id = ?
                  AND user_id = ?
                `,
                [userDishId, userId],
                (updateErr) => {
                    if (updateErr) {
                        console.error("Complete dish update error:", updateErr);
                        return res.status(500).json({
                            message: "Failed to complete dish."
                        });
                    }

                    pool.query(
                        `
                        UPDATE users
                        SET user_xp = user_xp + ?
                        WHERE id = ?
                        `,
                        [xpToAdd, userId],
                        (xpErr) => {
                            if (xpErr) {
                                console.error("XP update error:", xpErr);
                                return res.status(500).json({
                                    message: "Dish completed, but failed to update XP."
                                });
                            }

                            return res.status(200).json({
                                message: "Dish marked as completed.",
                                xpAdded: xpToAdd
                            });
                        }
                    );
                }
            );
        }
    );
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