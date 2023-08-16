const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

// create App function
    module.exports = function(app) {
        var userList = require('../controllers/userController');
        var authList = require('../controllers/auth')
        var decodeList = require('../controllers/decode')
        var redditList = require('../controllers/reddit')
        var postList = require('../controllers/post')
        var reportList = require('../controllers/report')

        app
        .route("/user")
        .get(userList.listAllUsers)
        .post(userList.createNewUser);
        app
        .route("/users/:id")
        .put(userList.updateUser)
        .delete(userList.deleteUser);
        app
        .route("/signup")
        .post(authList.signup);
        app
        .route("/signin")
        .post(authList.signin);
        app
        .route("/decode")
        .post(decodeList.decodeFunc);

        app
        .route("/cReddit")
        .post(redditList.createRedditPage);

        app
        .route("/getReddit")
        .post(redditList.findAllRedditPages);

        app.route("/deleteReddit")
        .post(redditList.deleteReddit)

        app.route("/getMembers")
        .post(redditList.getMembers)

        app.route("/getUser")
        .post(decodeList.getUser)

        app.route("/searchReddit")
        .post(redditList.searchReddit)

        app.route("/joinRequest")
        .post(redditList.joinRequest)

        app.route("/updateJoin")
        .post(redditList.updateJoin)

        app.route("/acceptJoin")
        .post(redditList.acceptJoin)

        app.route("/leaveReddit")
        .post(redditList.leaveReddit)

        app.route("/createPost")
        .post(postList.createPost)

        app.route("/getAllPosts")
        .post(postList.getAllPosts)

        app.route("/upvotePost")
        .post(postList.upvotePost)

        app.route("/downvotePost")
        .post(postList.downvotePost)

        app.route("/commentPost")
        .post(postList.commentPost)

        app.route("/savePost")
        .post(decodeList.savePost)
        
        app.route("/getPostData")
        .post(postList.getPostData)
        
        app.route("/unsavePost")
        .post(decodeList.unsavePost)

        app.route("/cascadeDeletePosts")
        .post(postList.cascadeDeletePosts)

        app.route("/updateProfile")
        .post(decodeList.updateProfile)

        app.route("/followUser")
        .post(decodeList.followUser)

        app.route("/followingUser")
        .post(decodeList.followingUser)

        app.route("/removeFollowersList")
        .post(decodeList.removeFollowersList)

        app.route("/removeFollowingList")
        .post(decodeList.removeFollowingList)

        app.route("/createReport")
        .post(reportList.createReport)

        app.route("/getReport")
        .post(reportList.getReport)

        app.route("/ignoreReport")
        .post(reportList.ignoreReport)

        app.route("/deletePost")
        .post(postList.deletePost)
    };