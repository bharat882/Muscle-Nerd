const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", require("./controllers/authController"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port"));
