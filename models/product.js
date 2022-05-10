const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
