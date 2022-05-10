const mongoose = require("mongoose"),
 schema = mongoose.Schema;

const orderSchema = new schema(
  {
    products: {
      type: [{ productId:{type: schema.Types.ObjectId, ref: "product"}, quantity:{type:Number, default:0,}}],
    },
    user: { type: schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
