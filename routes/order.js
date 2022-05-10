const express = require("express");
const Order = require("../models/order");
const Item = require("../models/product");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/orders", auth, async (req, res) => {
  const user = req.user._id;
  try {
    const order = await Order.find({ user }).populate("productId");
      res.status(200).send(order);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id).populate("productId");
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/", auth, async (req, res) => {
  const owner = req.user._id;
  const { productId, quantity } = req.body;
  try {
    const item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
      const newCart = await Order.create({
        user,
        products: [{ productId, quantity }],
      });
      return res.status(201).send(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});


router.delete("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    const { productId } = req.body;
    if (order) {
        const item = await Item.findOne({ _id: productId });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        };
        const arr = order.products.filter(
          (item) => item.productId !== productId
        );
        order.products = arr;
        await order.save();
        return res.status(200).send(newCart);
    }
    return res.status(400).send("order not found");
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  const { productId, quantity } = req.body;
  if (order) {
    const item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
      const arr = await order.products.filter((item) => item.productId !== productId);
      const product = ({
          quantity,
          productId,
      });
      arr.push(product);
    order.product = arr;
    await order.save();
    return res.status(200).send(newCart);
  }
  return res.status(400).send("order not found");
});