const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const morganConfig = require("./config/morgan");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());

app.use(morganConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

connectDB();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
