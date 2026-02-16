const express = require("express")

const postRouter = express.Router()

const postController = require("../controllers/post.controller")

const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

// POST /application/posts---[protected]
// req.body--[Caption,imgUrl]

postRouter.post('/',upload.single("imgUrl"),postController.createPostController)

// GET api/posts/---[protected]--
postRouter.get('/',postController.getPostController)

// GET /api/posts/:postid
//return a detail about specific post with the id also check wether the post belong to the user 
// that the request come from

postRouter.get('/details/:postId',postController.getPostDetailController)



module.exports = postRouter