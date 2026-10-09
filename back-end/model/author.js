const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name must mention"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description must mention"],
    trim: true,
  },
  mostPopularBook: {
    bookName: {
      type: String,
      required: [true, "book Name must mention"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price must mention"],
      trim: true,
    },
    averageRating: {
      type: Number,
      required: [true, "average Rating must mention"],
      trim: true,
    },
  },
  mainGenres: [
    {
      type: String,
      required: [true, "main Genres must mention"],
      trim: true,
    },
  ],
  allBooks: [
    {
      bookName: {
        type: String,
        required: [true, "book Name must mention"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "price must mention"],
        trim: true,
      },
      averageRating: {
        type: Number,
        required: [true, "average Rating must mention"],
        trim: true,
      },
    },
  ],
});

module.exports = mongoose.model("Author", authorSchema);
