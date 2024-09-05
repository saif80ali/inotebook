const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  stock_name: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
    require: true
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("stock", stockSchema);
