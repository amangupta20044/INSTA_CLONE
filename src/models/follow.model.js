const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    followers:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"users",
        // required:[true,"followe is required"]
    },
    followee:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"users",
        // required:[true,"followee is required"]
    }
}, {
    timestamps:true
})
// validation to check if user is already following or not--ak bar follow karne ke baad dobara follow nahi kar sakta

followSchema.index({followers:1,followee:1},{unique:true})

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel