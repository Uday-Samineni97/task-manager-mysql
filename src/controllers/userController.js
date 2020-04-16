const userModel =require("../models/userModel")


exports.userRegister=async (req,res)=>{
 
    await userModel.register(req,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.status(200).send("User registered successfully!!")
        }
    }) 
}


exports.userLogin=async (req,res)=>{
 
    await userModel.login(req,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.status(200).send("User loggedin Successfully!!")
        }
    }) 
}