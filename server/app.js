const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const morganConfig = require("./config/morgan");
const routes = require("./routes");
require("dotenv").config();
const path = require('path'); 

const app = express();

app.use(helmet());
app.use(cors());

app.use(morganConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

connectDB();

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

global.__basedir = __dirname;

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
