const express = require("express")
const cookieParser= require("cookie-parser")
const cors = require('cors')

const app = express()

app.use(express.json())// middleware --esase req.body me data aa jayega
app.use(cookieParser())// cookie parser as a middleware use hota hai

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

// require routes
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")
// using routes
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)

module.exports=app