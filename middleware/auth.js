const jwt=require('jsonwebtoken')


const auth=(req,res,next)=>{
   try{
   const token=req.header('Authorization').replace("Bearer ","")
   console.log("Token",token)
   jwt.verify(token,process.env.JWT_SECRET,(err,response)=>{
       if(err){

           return res.send("Please provide valid Authentication token")
       }else{
           req.authData=response
           next();
       }
   })

   }
   catch(e){
       res.send("Please authenticate.....")
   }
}

module.exports=auth