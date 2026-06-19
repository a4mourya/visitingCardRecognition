
require("dotenv").config();
const express = require("express");
const path = require("path");
const cardRoutes = require("./routes/cardRoutes");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", cardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});