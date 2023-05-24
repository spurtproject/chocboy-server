const { Router } = require("express");
const {
  createCart,
  editCartItem,
  getCart,
  updateCart,
  deleteCart,
} = require("./cart.controller");
const router = Router();

router.post("/create", createCart);

router.get("/single/", getCart);

router.put("/update", updateCart);

router.put("/edit/:itemId", editCartItem);

router.delete("/delete/:itemId", deleteCart);

module.exports = router;
