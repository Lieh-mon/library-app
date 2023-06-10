const port = 1111;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  //require("dotenv").config();
}
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expressLayouts);

//displaying content for our website using app.use instead of app.get possible from module we imported

app.use("/", indexRouter);

// setting up the database connection

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log(`Connected to Mongoose`);
});

//port
app.listen(process.env.PORT || port, () => {
  console.log(`Port is up on http://localhost:${port}`);
});