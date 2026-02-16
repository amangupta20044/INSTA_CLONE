const express = require("express")
const cookieParser= require("cookie-parser")
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const app = express()

app.use(express.json())// middleware --esase req.body me data aa jayega
app.use(cookieParser())// cookie parser as a middleware use hota hai
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
module.exports=app