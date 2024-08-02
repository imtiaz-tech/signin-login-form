const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    confirmpassword:String
})
 const userModel=mongoose.model("info",userSchema)
 module.exports =userModel;