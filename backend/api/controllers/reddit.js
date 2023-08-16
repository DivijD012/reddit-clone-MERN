const Reddit = require('../models/subRedditModels')

exports.createRedditPage = (req, res) => {
    let {userid, name, description, tags, banned_keywords, num_follows, num_posts} = req.body;
    // console.log(req.body);
    // console.log(userid);
    console.log("HI")
    const reddit = new Reddit({
        userid:userid,
        name:name,
        description:description,
        tags:tags,
        banned_keywords:banned_keywords,
        num_follows:num_follows,
        num_posts:num_posts,
        joining_request:[],
        membersBlocked:[],
        members:[userid],
        membersLeft:[],
        time:Date.now()
    });
    reddit.save()
    .then(response => {
        console.log(reddit)
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

exports.findAllRedditPages = (req, res) => {
    let {userid} = req.body;
    Reddit.find({userid:userid}, (err, page) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(page);
    })
}

exports.deleteReddit = (req, res) => {
    let {postid} = req.body;
    Reddit.deleteOne({_id : postid}).then(function(){
        console.log("Data deleted");
    }).catch(function(error){
        console.log(error);
    });
}

exports.getMembers = (req, res) => {
    let {pageid} = req.body;
    Reddit.findById(pageid, (err, page) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).json(page);
    })
}

exports.searchReddit = (req, res) => {
    let {search} = req.body;
    Reddit.find({}, (err, page) => {
        if(err) {
            res.status(500).send(err);
        }
        console.log(page);
        res.status(200).json(page);
    })
}

exports.joinRequest = (req, res) => {
    let {userid, pageid} = req.body;
    Reddit.findByIdAndUpdate(pageid, { "$push": { "joining_request": userid } }, (err, page) => {
        if(err) {
            console.log("ERRORORORORO")
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page);
    })
}

exports.updateJoin = (req, res) => {
    let {join, pageid} = req.body;
    Reddit.findByIdAndUpdate(pageid, {"joining_request":join}, (err, page) => {
        if(err) {
            console.log("Error in UpdateJoin")
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page)
    })
}

exports.acceptJoin = (req, res) => {
    let {userid, pageid, count} = req.body;
    count = Number(count) + 1
    Reddit.findByIdAndUpdate(pageid, { "$push": { "members": userid } , "num_follows" : count}, (err, page) => {
        if(err) {
            console.log("ERRORORORORO")
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page);
    })
}

exports.leaveReddit = (req, res) => {
    let {userid, pageid, array, count} = req.body;
    count = Number(count) - 1
    console.log(array);
    Reddit.findByIdAndUpdate(pageid, {"members" : array, "$push": { "membersLeft": userid }, "num_follows":count}, (err, page) => {
        if(err) {
            console.log("ERRORORORORO")
            res.status(500).send(err)
        }
        console.log(page)
        res.status(200).json(page);
    })
}