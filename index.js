const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB.");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/",(req, res) => {
    res.send("Welcome to the homepage");
})

app.get("/user",(req, res) => {
    res.send("Welcome to the user page");
})

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}

app.use(ignoreFavicon);

app.listen(8800, () => {
    console.log("My backend server is running!");
});