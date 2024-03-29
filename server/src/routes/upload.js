const router = require("express").Router()
const cloudinary = require('cloudinary')
const auth= require("../middleware/auth")
const authAdmin= require("../middleware/authAdmin")
const fs =require("fs")

/* WE WILL  UPLOAD FILE OR IMG */
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

/* UPLOAD IMAGE */
router.post('/upload',auth,(req,res)=>{
        try{
            console.log(req.files)
            
            if(!req.files || Object.keys(req.files).length===0)
            {
             
                return res.status(400).json({msg:"No files were upload"})
            }

            const file= req.files.file
            // 1024* 1024 =1mb
            if(file.size > 1024*1024) 
            {
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"Files size too large"})
            }

            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
            {
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"Wrong format file"})
            }

            cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"test"},async(err,result)=>{
                if(err){ throw err }

                removeTmp(file.tempFilePath)     
                
                res.json({public_id: result.public_id, url: result.secure_url})

            })
        }   
        catch(err){
            res.status(500).json({msg:err.message})
        }

})
// Delete image only admin can use
router.post('/destroy',auth, (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

const removeTmp = (path)=>{
    fs.unlink(path,err=>{
        if(err) throw err 
    })
}


module.exports = router

