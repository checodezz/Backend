const express = require("express");
const { initializeDatabase } = require("./db/db.connect");

const app = express();

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello")
})

const PORT = 3000;
app.use(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})

