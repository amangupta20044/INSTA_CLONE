const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require("jsonwebtoken")
const likeModel = require('../models/like.model')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});

async function createPostController(req, res) {

    // image kit par data send kiya

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: "cohort-2-insta-clone"

    })
    // creating post
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id// ye middleware se aaya hai
    })
    res.status(201).json({
        message: "post created successfully",
        post
    })

}
async function getPostController(req, res) {
    
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })
    res.status(201).json({
        message: "post fetched successfully",
        posts
    })
}

async function getPostDetailController(req, res) {
   
    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isValidUser = post.user.toString() === userId
    if(!isValidUser){
        return res.status(403).json({
            message:"forbidded content"
        })
    }
    return res.status(400).json({
        message:"post fetched successfully",
        post
        
    })
}

async function likePostController(req,res){
    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const like = await likeModel.create({
        post:postId,
        user:userId
    })
    res.status(201).json({
        message:"post liked successfully",
        like
    })
}

async function getFeedController(req,res){
    const posts = await postModel.find().populate("user").sort({createdAt:-1})
    res.status(200).json({
        message:"feed fetched successfully",
        posts
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailController,
    likePostController,
    getFeedController
}
