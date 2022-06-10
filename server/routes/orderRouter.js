const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/order")
  .get(auth, orderCtrl.getOrders)
  .get(auth, orderCtrl.getOrderDetail)
  .post(auth, orderCtrl.createOrder);
router
  .route("/order/:id")
  .put(auth, authAdmin, orderCtrl.changeStatusOrder)
  .delete(auth, authAdmin, orderCtrl.deleteOrder);

module.exports = router;
