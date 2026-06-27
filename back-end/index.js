const express = require("express");
const app = express();
require("dotenv").config();
const port = 5000 || process.env.PORT;
const connectDB = require("./DB/connection");
const bookRouter = require("./Router/book");

// Book Route
app.use("/api/v1/book", bookRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log("DataBase connect...");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startDB();
