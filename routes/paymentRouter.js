const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth,paymentCtrl.getPayments)
    .get(auth,paymentCtrl.getPaymentDetail)
    .post(auth,paymentCtrl.createPayment)
router.route('/payment/:id')
    .put(auth,authAdmin,paymentCtrl.changeStatusPayment)
    .delete(auth,authAdmin,paymentCtrl.deletePayment)

 module.exports = router