const express=require("express")
const router=express.Router();
const userController=require('../controllers/userController')
const auth=require("../../middleware/auth")

router.post("/login",userController.userLogin);
router.post("/register",userController.userRegister);
router.post("/getuser",auth,userController.userById);

module.exports=router
