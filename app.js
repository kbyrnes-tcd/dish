// Load environment variables from .env file
require("dotenv").config();
const DBCONFIG = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

// Import necessary modules
const express = require("express");
const path = require("path")
const mysql = require("mysql");
const QueryBuilder = require("node-querybuilder");
const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
const PORT = 8000;
const app = express();

// Connect assets folder to serve static files
app.use(express.static(path.join(__dirname, "./assets")));

// Set up route for home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// Start the server
app.listen( PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));