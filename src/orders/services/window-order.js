const Order = require("../models");
const mongoose = require("mongoose");
const moment = require("moment");

const createWindowOrder = async (data) => {
  const totalPrice = await data.items.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.items.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);
  const date = moment().format("L");

  const rawData = {};

  rawData.phone = data.userphone;
  rawData.state = data.state;
  rawData.address = data.address;
  rawData.deliveryAmount = data.amount;

  rawData.description = data.description;
  rawData.transactionId = mongoose.Types.ObjectId(data.transactionId);

  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.items = data.items;
  // transactionId, description, phone, state, address, delivery amount, deliverystatus
  // items: choicqty, unitprice, product
  const generateOrder = await Order.create(rawData);
  return generateOrder;
};

module.exports = createWindowOrder;
