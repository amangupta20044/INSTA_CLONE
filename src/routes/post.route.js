const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const identifyUser = require("../middleware/auth.middleware")


const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

// POST /application/posts---[protected]
// req.body--[Caption,imgUrl]

postRouter.post('/',upload.single("imgUrl"),identifyUser,postController.createPostController)

// GET api/posts/---[protected]--
postRouter.get('/',identifyUser,postController.getPostController)

// GET /api/posts/:postid
//return a detail about specific post with the id also check wether the post belong to the user 
// that the request come from

postRouter.get('/details/:postId',identifyUser,postController.getPostDetailController)

/* 
@route -- post api/users/like/:postId
@description -- like a post with the id provided in the req params
*/

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

module.exports = postRouter