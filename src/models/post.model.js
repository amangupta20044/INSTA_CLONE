const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default : ""
    },
    imgUrl:{
        type:String,
        require:[true,"imgUrl is require for creating a post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"userId is requre for creating a post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports=postModel