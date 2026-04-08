
// Import necessary modules
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const DBCONFIG = require('./utils/DBCONFIG');

const pool = mysql.createPool({
    ...DBCONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const PORT = 8000;
const app = express();

//add CORS
const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "./assets")));

// Home route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// API health check
app.get("/api/health", function (req, res) {
    res.json({ message: "API is running" });
});

// Test database connection
app.get("/api/test-db", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query("SELECT 1 AS test", function (err, result) {
            connection.release();

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Database connection successful",
                result: result
            });
        });
    });
});

// Get all dishes
app.get("/api/dishes", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query("SELECT * FROM dishes", function (err, result) {
            connection.release();

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(result);
        });
    });
});

// Get all restaurants
app.get("/api/restaurants", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query(
            "SELECT * FROM restaurants ORDER BY restaurant_name ASC",
            function (err, result) {
                connection.release();

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(result);
            }
        );
    });
});

// Get all users
app.get("/api/users", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query(
            "SELECT * FROM users ORDER BY username ASC",
            function (err, result) {
                connection.release();

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(result);
            }
        );
    });
});

// Get all reviews
app.get("/api/reviews", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query(
            "SELECT * FROM reviews ORDER BY id DESC",
            function (err, result) {
                connection.release();

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(result);
            }
        );
    });
});

// Get all user dish assignments
app.get("/api/user-dishes", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query(
            "SELECT * FROM user_dishes ORDER BY assigned_at DESC",
            function (err, result) {
                connection.release();

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(result);
            }
        );
    });
});

//add new route for get dish recommendation
app.post("/api/dishes/recommend", function (req, res) {
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

    pool.query(query, values, function (err, results) {
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


// Start server
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
