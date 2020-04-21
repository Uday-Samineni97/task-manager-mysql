const userModel =require("../models/userModel")

const jwt=require('jsonwebtoken')

exports.userRegister=async (req,res)=>{
  
    await userModel.register(req,(err,result)=>{
        if(err){
            res.send(err)
            console.log("Err",err)
        }
        else{
            console.log("Result",result)
            const token=jwt.sign({user_id:data[0].id},process.env.JWT_SECRET,{expiresIn:'24h'})
            res.status(200).send({"message":"User registered successfully!!","token":token})
        }
    }) 
}


exports.userLogin=async (req,res)=>{
 
    await userModel.login(req,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.status(200).send(result)
        }
    }) 
}
exports.userById=async (req,res)=>{
 
    await userModel.getUser(req,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.status(200).send(result)
        }
    }) 
}