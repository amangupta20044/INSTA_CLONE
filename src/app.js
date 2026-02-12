const express = require("express")

const app = express()
app.use(express.json())// middleware --esase req.body me data aa jayega

module.exports=app