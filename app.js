const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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

// allow requests from Live Server frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname));

// pages
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

// test DB connection
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

// get all dishes
app.get("/api/dishes", (req, res) => {
    pool.query("SELECT * FROM dishes", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// get all restaurants
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

// get all users (without passwords)
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

// get all reviews
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

// get all user dish assignments
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

// register a new user
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

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long."
        });
    }

    try {
        pool.query(
            "SELECT id FROM users WHERE user_email = ?",
            [email],
            async (selectErr, results) => {
                if (selectErr) {
                    console.error("Register select error:", selectErr);
                    return res.status(500).json({
                        message: "Server error while checking existing user."
                    });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        message: "An account with this email already exists."
                    });
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

// recommend a dish
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

app.listen(PORT, () => {
    console.log(`App running on http://127.0.0.1:${PORT}`);
});