const express = require("express");
const app = express();
require("dotenv").config();
require("./db.js");
app.use(express.json);

const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const itemRoute = require("./routes/product");

app.use("/item", itemRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = 8080;
app.listen(PORT, () => {
    console.log("app running on " + PORT);
})