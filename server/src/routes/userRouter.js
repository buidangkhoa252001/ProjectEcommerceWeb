const router = require('express').Router()
const userCtrl = require("../controllers/userCtrl")
const auth = require('../middleware/auth')
router.post('/register',userCtrl.register)

router.post('/login',userCtrl.login)

router.get('/logout',userCtrl.logout)

router.get('/refresh_token',userCtrl.refreshToken)

router.get('/infor',auth,userCtrl.getUser)

router.patch("/addcart",auth,userCtrl.addCart)


router.get('/history', auth, userCtrl.history)
router.get('/history/:id', auth, userCtrl.getHitory)
router.get('/cart', auth, userCtrl.cart)
router.post('/reset', auth, userCtrl.resetPassword)
router.patch('/reset/:id', auth, userCtrl.resetAdminPassword)
router.patch('/update', auth, userCtrl.updateUser)
router.patch('/update/:id', auth, userCtrl.updateUserAdmin)
router.delete('/delete/:id', auth, userCtrl.deleteUser)
router.get('/getAllUser', /* auth, */ userCtrl.getAllUser)
router.get('/getUser/:id', auth, userCtrl.getUserId)

module.exports = router