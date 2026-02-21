const express = require("express")
const authController = require("../controllers/auth.controller")
const identyfyUser = require("../middleware/auth.middleware")

const authRouter = express.Router()

// POST api/auth /register

authRouter.post("/register",authController.registerController)

// POST api/auth /login

authRouter.post("/login",authController.loginController)

//  @route GET api/auth/get-me
// @desc-- get currently loged in user details
//  @access private

authRouter.get("/get-me",identyfyUser,authController.getMeController)

module.exports = authRouter
