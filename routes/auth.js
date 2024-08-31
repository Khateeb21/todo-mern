const router=require("express").Router()
const bcrypt=require("bcryptjs")
const User= require("../models/user")

router.post('/register',async(req,res)=>{

try {

    const {email,username,password}=req.body
    const hashpassword=bcrypt.hashSync(password)
    const user= new User({email,username,password:hashpassword})

    await user.save().then(()=>{
       res.status(200).json({message:'sign up successful'})

    })
    
} catch (error) {
    

    res.status(200).json({message:'user already exists'})
}
}),



module.exports=router