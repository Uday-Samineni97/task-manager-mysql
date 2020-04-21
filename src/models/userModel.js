const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require('dotenv').config();
const database = require("../../config/db/db_config");
console.log("Data",database)
exports.register = (req, result) => {
  console.log("Hi")
  database.query(
    "select * from user where email=?",
    [req.body.email],
    (error, data) => {
      
      if ( data && data.length > 0) {
        result("Email already registered!! Please choose another email", null);
      } else {
        const salt = bcrypt.genSaltSync(10);
        const insert_data = [
          {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone
          }
        ];
    
        database.query("INSERT into user set ?", insert_data, (error, data) => {
          console.log("Hi1")
          if (error) {
            result(error, null);
          } else {
            result(null, data);
          }
        });
      }
    }
  );
};

exports.login = (req, result) => {
  database.query(
    "select * from user where email = ?",
    [req.body.email],
    (error, data) => {
      if (data.length>0) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
            const token=jwt.sign({user_id:data[0].id},process.env.JWT_SECRET,{expiresIn:'24h'})
            result(null,{"message":"User logged in successfully!!","token":token})
        }
        else{
            result("Password is incorrect!! Please try with correct password")
        }
      }
      else{
          result("Email is not registered!!")
      }
    }
  );
};

exports.getUser=(req,result)=>{
    result(null,"I am getuser")
}