const followModel = require("../models/follow.model")

async function followUserController(req,res){
    // const id = req.id

    // check if user is trying to follow himself or not
    const followersUsername = req.params.username
    const followeeUsername = req.params.username
    if(followersUsername === followeeUsername){
        return res.status(400).json({
            message:"you can't follow yourself"
        })
    }
    // chaek  if followers exist or not
    const followeExist = await userModel.findOne({
        username:followeeUsername
    })
    if(!followeExist){
        return res.status(404).json({
            message:"user not found"
        })
    }
    // check  if already following or not
    const isAllreadyFollowing = await followModel.findOne({
        followers : followersUsername,
        followee : followeeUsername
    })
    if(isAllreadyFollowing){
        return res.status(200).json({
            message:`you are alrady following ${followeeUsername}`
        })
    }
    // create follow record

    const followRecord = await followModel.create({
        followers:followersUsername,
        followee:followeeUsername
    })
    res.status(201).json({
        message:`you are now following ${followeeUsername}`,
        follow : followRecord
    })
}

async function unfollowUserController(req,res){
    const followersUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        followers:followersUsername,
        followee:followeeUsername
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeeUsername}`
    })
}

module.exports={
    followUserController,
    unfollowUserController
}

