const Orders = require("../models/orderModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const orderCtrl = {
  getOrders: async (req, res) => {
    try {
      const order = await Orders.find();
      res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOrderDetail: async (req, res) => {
    try {
      const order = await Orders.find({ user_id: req.user.id });

      res.json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Orders.findByIdAndDelete(req.params.id);
      res.json({ msg: "Order has been deleted..." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changeStatusOrder: async (req, res) => {
    try {
      const order = await Orders.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User not exist " });
      const { cart, paymentID, order_detail } = req.body;

      const { _id, name, email } = user;
      const newOrder = new Orders({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        order_detail,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      await newOrder.save();
      res.json({ newOrder });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = orderCtrl;
