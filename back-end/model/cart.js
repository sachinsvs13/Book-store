const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: [true, "Image must be mentioned"],
    },
    author: {
      type: String,
      required: [true, "Author must be mentioned"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity must be mentioned"],
      trim: true,
    },
    bought: {
      type: Boolean,
      required: [true, "bought must be mentioned"],
      default: false,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", cartSchema);
