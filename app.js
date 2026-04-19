const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const multer = require("multer");
const DBCONFIG = require("./utils/DBCONFIG");

const app = express();
const PORT = 8000;

console.log("APP FILE LOADED");

const pool = mysql.createPool({
    ...DBCONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/* ----------------- uploads setup ------------------ */

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const safeName = file.originalname.replace(/\s+/g, "-");
        cb(null, `${uniqueSuffix}-${safeName}`);
    }
});

const upload = multer({
    storage
});

/* ----------------- cors ------------------ */

// allow requests from Live Server frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

/* ----------------- session middleware ------------------ */

app.use(session({
    secret: "dish-secret-key-change-this-later",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true only with HTTPS
        httpOnly: true,
        sameSite: "lax"
    }
}));

/* ----------------- middleware ------------------ */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------- static files ------------------ */

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname));

/* ----------------- helper functions ------------------ */

function getXpValue(price) {
    if (price === "€") return 50;
    if (price === "€€") return 100;
    if (price === "€€€") return 150;
    return 0;
}

function completeDishAfterReview(userDishId, userId, res, reviewId) {
    pool.query(
        `
        SELECT 
            ud.id,
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
                console.error("Complete-after-review select error:", selectErr);
                return res.status(500).json({
                    message: "Review saved, but failed to find dish for completion."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Review saved, but assigned dish was not found for completion."
                });
            }

            const row = results[0];
            const xpToAdd = getXpValue(row.restaurant_price);

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
                        console.error("Complete-after-review update error:", updateErr);
                        return res.status(500).json({
                            message: "Review saved, but failed to complete dish."
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
                                console.error("XP update after review error:", xpErr);
                                return res.status(500).json({
                                    message: "Review saved and dish completed, but failed to update XP."
                                });
                            }

                            return res.status(201).json({
                                message: "Review posted successfully.",
                                reviewId,
                                xpAdded: xpToAdd
                            });
                        }
                    );
                }
            );
        }
    );
}

/* ----------------- pages ------------------ */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/new-dish.html", (req, res) => {
    res.sendFile(path.join(__dirname, "new-dish.html"));
});

app.get("/my-dishes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "my-dishes.html"));
});

app.get("/review.html", (req, res) => {
    res.sendFile(path.join(__dirname, "review.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

/* ----------------- basic api routes ------------------ */

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

/* ----------------- auth routes ------------------ */

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

/* ----------------- dish recommendation routes ------------------ */

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
            rd.course_type,
            rv.review_rating,
            rv.dish_review
        FROM user_dishes ud
        JOIN restaurants_dishes rd ON ud.dish_id = rd.id
        JOIN dishes d ON rd.dishes_id = d.id
        JOIN restaurants r ON rd.restaurant_id = r.id
        LEFT JOIN reviews rv 
            ON rv.user_id = ud.user_id
           AND rv.dish_id = ud.dish_id
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

            if (results.length === 0) {
                return res.json([]);
            }

            const dishIds = results.map((row) => row.dish_id);

            pool.query(
                `
                SELECT dish_id, file_path
                FROM photos
                WHERE user_id = ?
                  AND dish_id IN (?)
                ORDER BY uploaded_at ASC, id ASC
                `,
                [userId, dishIds],
                (photoErr, photoResults) => {
                    if (photoErr) {
                        console.error("History photos query error:", photoErr);
                        return res.status(500).json({
                            message: "Failed to fetch dish photos."
                        });
                    }

                    const photosByDishId = {};

                    photoResults.forEach((photo) => {
                        if (!photosByDishId[photo.dish_id]) {
                            photosByDishId[photo.dish_id] = [];
                        }

                        photosByDishId[photo.dish_id].push(photo.file_path);
                    });

                    const historyWithPhotos = results.map((dish) => ({
                        ...dish,
                        photos: photosByDishId[dish.dish_id] || []
                    }));

                    return res.json(historyWithPhotos);
                }
            );
        }
    );
});

/* ----------------- delete review route ------------------ */


console.log("About to register DELETE /api/reviews/:userDishId");

app.delete("/api/reviews/:userDishId", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not logged in." });
    }

    const userId = req.session.userId;
    const userDishId = req.params.userDishId;

    pool.query(
        `
        SELECT dish_id
        FROM user_dishes
        WHERE id = ?
          AND user_id = ?
          AND dish_status = 'completed'
        LIMIT 1
        `,
        [userDishId, userId],
        (err, results) => {
            if (err) {
                console.error("Delete dish select error:", err);
                return res.status(500).json({ message: "Error finding completed dish." });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Completed dish not found." });
            }

            const dishId = results[0].dish_id;

            pool.query(
                `
                SELECT file_path
                FROM photos
                WHERE user_id = ?
                  AND dish_id = ?
                `,
                [userId, dishId],
                (photoSelectErr, photoResults) => {
                    if (photoSelectErr) {
                        console.error("Photo fetch error:", photoSelectErr);
                        return res.status(500).json({ message: "Failed to fetch dish photos." });
                    }

                    photoResults.forEach((photo) => {
                        const relativePath = photo.file_path.replace(/^\/+/, "");
                        const fullPath = path.join(__dirname, relativePath);

                        if (fs.existsSync(fullPath)) {
                            try {
                                fs.unlinkSync(fullPath);
                            } catch (fileErr) {
                                console.error("File delete error:", fileErr);
                            }
                        }
                    });

                    pool.query(
                        `
                        DELETE FROM photos
                        WHERE user_id = ?
                          AND dish_id = ?
                        `,
                        [userId, dishId],
                        (photoDeleteErr) => {
                            if (photoDeleteErr) {
                                console.error("Photo delete error:", photoDeleteErr);
                                return res.status(500).json({ message: "Failed to delete dish photos." });
                            }

                            pool.query(
                                `
                                DELETE FROM reviews
                                WHERE user_id = ?
                                  AND dish_id = ?
                                `,
                                [userId, dishId],
                                (reviewDeleteErr) => {
                                    if (reviewDeleteErr) {
                                        console.error("Review delete error:", reviewDeleteErr);
                                        return res.status(500).json({ message: "Failed to delete review." });
                                    }

                                    pool.query(
                                        `
                                        DELETE FROM user_dishes
                                        WHERE id = ?
                                          AND user_id = ?
                                          AND dish_status = 'completed'
                                        `,
                                        [userDishId, userId],
                                        (userDishDeleteErr, userDishDeleteResult) => {
                                            if (userDishDeleteErr) {
                                                console.error("User dish delete error:", userDishDeleteErr);
                                                return res.status(500).json({ message: "Failed to delete dish history item." });
                                            }

                                            if (userDishDeleteResult.affectedRows === 0) {
                                                return res.status(404).json({ message: "Completed dish not found for deletion." });
                                            }

                                            return res.json({
                                                message: "Dish removed from past dishes successfully."
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

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
            const xpToAdd = getXpValue(row.restaurant_price);

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

/* ----------------- review route ------------------ */

console.log("About to register /api/reviews POST route");

app.post("/api/reviews", upload.array("photos", 4), (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not logged in."
        });
    }

    const userId = req.session.userId;
    const { dish_id, user_dish_id, review_rating, dish_review } = req.body;

    if (!dish_id || !user_dish_id || !review_rating) {
        return res.status(400).json({
            message: "Dish ID, user dish ID, and review rating are required."
        });
    }

    const numericRating = Number(review_rating);

    if (numericRating < 1 || numericRating > 5) {
        return res.status(400).json({
            message: "Review rating must be between 1 and 5."
        });
    }

    pool.query(
        `
        SELECT id, user_id, dish_id, dish_status
        FROM user_dishes
        WHERE id = ?
          AND user_id = ?
          AND dish_status = 'assigned'
        LIMIT 1
        `,
        [user_dish_id, userId],
        (selectErr, results) => {
            if (selectErr) {
                console.error("Review select error:", selectErr);
                return res.status(500).json({
                    message: "Failed to validate assigned dish."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Assigned dish not found."
                });
            }

            const assignedDish = results[0];

            if (Number(assignedDish.dish_id) !== Number(dish_id)) {
                return res.status(400).json({
                    message: "Dish mismatch."
                });
            }

            pool.query(
                `
                INSERT INTO reviews (user_id, dish_id, review_rating, dish_review)
                VALUES (?, ?, ?, ?)
                `,
                [userId, dish_id, numericRating, dish_review || null],
                (reviewErr, reviewResult) => {
                    if (reviewErr) {
                        console.error("Review insert error:", reviewErr);
                        return res.status(500).json({
                            message: "Failed to save review."
                        });
                    }

                    const uploadedFiles = req.files || [];

                    if (uploadedFiles.length > 4) {
                        return res.status(400).json({
                            message: "You can upload a maximum of 4 photos."
                        });
                    }

                    if (uploadedFiles.length === 0) {
                        return completeDishAfterReview(user_dish_id, userId, res, reviewResult.insertId);
                    }

                    const photoValues = uploadedFiles.map((file) => [
                        userId,
                        dish_id,
                        `/uploads/${file.filename}`
                    ]);

                    pool.query(
                        `
                        INSERT INTO photos (user_id, dish_id, file_path)
                        VALUES ?
                        `,
                        [photoValues],
                        (photoErr) => {
                            if (photoErr) {
                                console.error("Photo insert error:", photoErr);
                                return res.status(500).json({
                                    message: "Review saved, but failed to save photos."
                                });
                            }

                            return completeDishAfterReview(user_dish_id, userId, res, reviewResult.insertId);
                        }
                    );
                }
            );
        }
    );
});

/* ----------------- start server ------------------ */

app.listen(PORT, () => {
    console.log(`App running on http://127.0.0.1:${PORT}`);
});