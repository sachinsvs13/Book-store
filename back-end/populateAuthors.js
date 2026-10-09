require("dotenv").config();
const Author = require("./model/author");
const jsonAuthors = require("./assets/Authors.json");
const connectDB = require("./DB/connection");
const connectBD = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    await Author.deleteMany();
    await Author.create(jsonAuthors);
    console.log("success!!!");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectBD();
