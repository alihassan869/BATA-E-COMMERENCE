require('dotenv').config();
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {
    Country: String,
    Fname: String,
    Lname: String,
    Phone: String,
    address: String,
    state: String,
    City: String,
    code: String,
    message: String,
    Delivery: Number,
    Total: Number,
    checkbox: Boolean,
  },
  carts: [
    {
      rname: {
        type: String,
        required: true,
      },
      imgdata: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qnty: {
        type: Number,
        required: true,
      },
    },
  ],
  Total: {
    Price: String,
    Delivery: String,
  },
});

module.exports = mongoose.model(process.env.COLLECTION2, orderSchema);
