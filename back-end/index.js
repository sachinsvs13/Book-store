const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./DB/connection");
const bookRouter = require("./Router/book");
const userRouter = require("./Router/user");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json());

// Routes
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

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
