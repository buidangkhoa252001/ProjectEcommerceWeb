const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

const paymentCtrl={
    getPayments: async(req,res)=>{
        try{
            const payment = await Payments.find()
            res.status(200).json(payment);
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getPaymentDetail: async(req,res)=>{
        try {
            const payment = await Payments.find({user_id: req.user.id})

            res.json(payment)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePayment: async(req,res)=>{
        try {
            await Payments.findByIdAndDelete(req.params.id);
            res.json({msg: "Order has been deleted..."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    changeStatusPayment: async(req,res)=>{
        try {
            const payment = await Payments.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );

              res.status(200).json(payment)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

      
    createPayment: async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg:"User not exist "})
            const {cart, paymentID, address} = req.body;

            const {_id, name, email} = user;
            const newPayment = new Payments({
                  user_id: _id, name, email, cart, paymentID, address
            })
             cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })
            await newPayment.save()
            res.json({newPayment})
        }
        catch(err){
             return res.status(500).json({msg: err.message})
        }
    }
}



const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
