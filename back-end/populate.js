require("dotenv").config();
const Book = require("./model/book");
const jsonBooks = require("./assets/Books.json");
const connectDB = require("./DB/connection");
const connectBD = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    await Book.deleteMany();
    await Book.create(jsonBooks);
    console.log("success!!!");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectBD();
