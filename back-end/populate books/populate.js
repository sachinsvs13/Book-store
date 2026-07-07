const connect = require("../DB/connection");
require("dotenv").config();
const Book = require("../model/book");
const jsonBooks = require("../assets/Books.json");
const connectBD = async () => {
  try {
    await connect(process.env.MONGO_DB);
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
