const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default:0
  },
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  weightOfProduct: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'SubCategory',
    required: false,
  },
  
});

module.exports = mongoose.model("Product", productSchema);
