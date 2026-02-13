const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        require:[true,"username required"],
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email required"]
    },
    password:{
        type:String,
        required:[true,"email is required"],
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/fnt0we9v9/profile.jpg"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
