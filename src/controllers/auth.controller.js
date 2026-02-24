const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function registerController(req,res){
    const {username,email,password,bio,profileImage}=req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exists" + (isUserAlreadyExist.email == email ? "email is already exist" : "username already exist")
        })
    }

    const hash =await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })
    const token = jwt.sign({
        id:user._id,
        username : user.username
    },process.env.JWT_SECRET,
        {expiresIn:"7d"})
        res.cookie("token", token, {
            httpOnly: true,
            path: "/"
        })

        res.status(201).json({
            message:"user registered successfully",
            user:{
                email:user.email,
                username:user.username,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })
}

async function loginController(req,res){
   const {username,email,password} = req.body

   const user = await userModel.findOne({
    $or:[
        {username:username},
        {email:email}
    ]
   }).select("+password")// password ko select karo kyuki model me select false hai
   if(!user){
         return res.status(404).json({
            message:"user not found"
         })   
        }
        

        const  isPasswordValid = await bcrypt.compare(password,user.password)// convert karo hex me aur compare karo

        if(!isPasswordValid){
            return res.status(401).json({
                message:"password invalid"
            })
        }
        const token  = jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        res.cookie("token", token, {
            httpOnly: true,
            path: "/"
        })

        res.status(200).json({
            message:"user logedIn successfully",
            user:{
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })
}
async function getMeController(req,res){
    const userId =req.user.id
    const user = await userModel.findById(userId)

    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}
module.exports={
    registerController,
    loginController,
    getMeController
}