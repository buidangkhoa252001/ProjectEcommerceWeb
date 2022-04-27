const Users = require("../models/userModel")
const Payments = require('../models/paymentModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userCtrl = {
    register: async (req,res)=>{
        try{

            const {name,email,password} = req.body;
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg:"The email already exists"})
            if(password.length <6)

            return res.status(400).json({msg:"Password is least 6 char"})
              
            /* Password Encryption */   

            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new Users({
                name,email,password:passwordHash
            })
            /* save user */
            await newUser.save()
        

            /* Then create jsonwebtoken to authentication */
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
        

             res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    logout: async(req,res)=>{
        try{
            res.clearCookie("refreshtoken",{path:"/user/refresh_token"})
            return res.json({msg:"logout success"})
        }   

        catch(err){
            return res.status(500).json({msg:err.message})
        }
        
    },   
    refreshToken:(req,res)=>{
        try{
            
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please Login or Register"})

            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(400).json({msg:"Please login or register"})
                    
                const accesstoken = createAccessToken({id:user.id})

                res.json({user, accesstoken})

            })
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }

     
    },
    getUser: async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg:"User does not exist"})
            res.json(user)


        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    addCart: async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id)
            if(!user){
                return res.status(400).json({msg:"user is not exist"})
            }
            await Users.findOneAndUpdate({_id:req.user.id},{
                cart:req.body.cart
            })
            return res.json({msg:"add success"})

        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getHitory: async(req,res)=>{
        try {
            const historyId = await Payments.findById(req.params.id);
            res.status(200).json(historyId);
          } catch (err) {
            return res.status(500).json({msg: err.message})
          }

    },
    cart: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id)

            res.json(user.cart)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl
