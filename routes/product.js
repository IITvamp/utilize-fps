const express = require("express");
const Item = require("../models/product");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/add_item", auth, async (req, res) => {
    const { productId, quantity } = req.body;
  try {
    const newItem = new Item({
      productId,
      quantity,
    });
    await newItem.save();
    return res.status(201).send(newItem);
  } catch (error) {
    return res.status(400).send({ message: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

