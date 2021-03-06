const Category = require('../models/categoryModel')
const Products = require("../models/productModel")

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async(req,res)=>{
        try{
          
            const {name,description} = req.body
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"this category already exist"})
            const newCategory = new Category({name,description})

            await newCategory.save()
            res.json({msg:"Created category success"})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req,res)=>{
            try{
               /*  const products= Product.findOne({category:req.params.id})
                if(products) return res.status(400).json({msg:"please delete all products in relationship"})
 */
                const products = await Products.findOne({category: req.params.id})
                if(products) return res.status(400).json({
                    msg: "Please delete all products with a relationship."
                })
                await Category.findByIdAndDelete(req.params.id)
                res.json({msg:"Deleted a Category"})
            
            }
            catch(err){
                return res.status(500).json({msg: err.message})
            }

    },
    updateCategory: async(req, res) =>{
        try {
            const {name,description} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name,description})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = categoryCtrl