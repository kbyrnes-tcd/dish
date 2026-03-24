// Load environment variables from .env file
require("dotenv").config();

const DBCONFIG = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const QueryBuilder = require("node-querybuilder");

const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
const PORT = 8000;
const app = express();

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
    pool.get_connection(function (err, connection) {
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
    pool.get_connection(function (err, connection) {
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

// Start server
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
