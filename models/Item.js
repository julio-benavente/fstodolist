const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    expires: "10m",
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
