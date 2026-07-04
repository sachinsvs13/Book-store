const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name must mention"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price must be mentioned"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author must be mentioned"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre must be mentioned"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher must be mentioned"],
      trim: true,
    },
    publisherImprint: {
      type: String,
      required: [true, "Publisher Imprint must be mentioned"],
      trim: true,
    },
    ISBN10: {
      type: Number,
      required: [true, "ISBN10 must be mentioned"],
      trim: true,
    },
    ISBN13: {
      type: Number,
      required: [true, "ISBN13 must be mentioned"],
      trim: true,
    },
    pages: {
      type: Number,
      required: [true, "Pages must be mentioned"],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language must be mentioned"],
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, "Weight must be mentioned"],
      trim: true,
    },
    dimension: {
      type: Number,
      required: [true, "Dimension must be mentioned"],
      trim: true,
    },
    returnable: {
      type: Boolean,
      required: [true, "Returnable must be mentioned"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description must be mentioned"],
      trim: true,
    },
    released: {
      type: Date,
      required: [true, "Released must be mentioned"],
      trim: true,
    },
    averageRating: {
      type: Number,
    },
    binding: {
      type: String,
      required: [true, "binding must be mentioned"],
      trim: true,
    },
    // Decide weather to add review or not
    review: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        name: {
          type: String,
        },
        upVote: {
          type: Number,
        },
        downVote: {
          type: Number,
        },
        recommend: {
          type: Boolean,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
