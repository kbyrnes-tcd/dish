const express = require("express");
const path = require("path")
const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "./assets")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen( PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

require("dotenv").config();
const DBCONFIG = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}