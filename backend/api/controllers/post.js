const Post = require('../models/postModel')

exports.createPost = (req, res) => {
    let {pageid, pagename, userid, username, posttext} = req.body;
    // console.log(req.body);
    // console.log(userid);
    const post = new Post({
        postedById:userid,
        postedByName:username,
        postedInId:pageid,
        postedInName:pagename,
        text:posttext,
        upvotes:0,
        downvotes:0,
        upvoteList:[],
        downvoteList:[],
        comments:[]
    });
    post.save()
    .then(response => {
        console.log(post)
        res.status(200).json({
        success: true,
        result: response
        })
    })
    .catch(err => {
        console.log("Error here")
        res.status(500).json({
        errors: [{ error: err }]
        });
    });
}

exports.getAllPosts = (req, res) => {
    let {pageid} = req.body;
    Post.find({postedInId:pageid}, (err, page) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(page);
    })
}

exports.upvotePost = (req, res) => {
    let {userid, postid, count} = req.body;
    count = Number(count) + 1
    Post.findByIdAndUpdate(postid, { "$push": { "upvoteList": userid } , "upvotes" : count}, (err, page) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page);
    })
}

exports.downvotePost = (req, res) => {
    let {userid, postid, count} = req.body;
    count = Number(count) + 1
    Post.findByIdAndUpdate(postid, { "$push": { "downvoteList": userid } , "downvotes" : count}, (err, page) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page);
    })
}

exports.commentPost = (req, res) => {
    let {postid, text} = req.body;
    Post.findByIdAndUpdate(postid, { "$push": { "comments": text }}, (err, page)=>{
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page)
    })
}

exports.getPostData = (req, res) => {
    let {postid} = req.body;
    Post.findById(postid, (err, post) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(post)
        res.status(200).json(post)
    })
}

exports.cascadeDeletePosts = (req, res) => {
    let{pageid} = req.body;
    Post.deleteMany({ postedInId : pageid }).then(function(){
        Post.find({}, (err, page) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(page);
        })
    }).catch(function(error){
        console.log(error);
        res.status(500).send(err)
    });
}

exports.deletePost = (req, res) => {
    let {postid} = req.body;
    Post.findByIdAndDelete(postid, (err, post)=> {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.status(200).json(post)
    })
}

