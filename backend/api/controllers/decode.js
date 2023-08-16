const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt")

exports.decodeFunc = (req, res) => {
    let {token} = req.body;
    console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
        return res.status(500).json({ erros: err });
        }
        if (decoded) {
            User.findById(decoded.userId).then (
                user=> {
                    if(user) {
                        console.log(user)
                        return res.status(200).json({
                            fname: user.fname,
                            lname: user.lname,
                            username: user.username,
                            email: user.email,
                            age: user.age,
                            contact: user.contact,
                            followers: user.followers,
                            following: user.following,
                            decode: decoded.userId
                            });
                    }
                    else
                        return res.status(422).json({ "Error" : "Didn't work" });
                }

            )
        }
        })
}

exports.getUser = (req, res) => {
    let {userid} = req.body;
    console.log(userid)
    User.findById(userid, (err, user) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).json(user);
    })
}

exports.savePost = (req, res) => {
    let {userid, postid} = req.body;
    User.findByIdAndUpdate(userid, { "$push": { "savedPosts": postid }}, (err, user)=> {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })   
}

exports.unsavePost = (req, res) => {
    let {userid, array} = req.body;
    User.findByIdAndUpdate(userid, { "savedPosts": array }, (err, user)=> {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })   
}

exports.updateProfile = (req, res) => {
    let {fname, lname, age, contact, password, userid} = req.body;
    bcrypt.hash(password, 10, function(err, hash){
        if(err) throw err;
        password = hash;
        console.log(password);
        User.findByIdAndUpdate(userid, { "fname": fname, "lname" : lname, "age" : age, "contact" : contact, "password" : password }, (err, user)=> {
            if(err) {
                console.log(err)
                res.status(500).send(err)
            }
            console.log(user)
            res.status(200).json(user)
        }) 
    })
}

exports.followUser = (req, res) => {
    let {userid, otheruserid} = req.body
    User.findByIdAndUpdate(otheruserid, { "$push": { "followers": userid }}, (err, user) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })
}

exports.followingUser = (req, res) => {
    let {userid, otheruserid} = req.body
    User.findByIdAndUpdate(userid, { "$push": { "following": otheruserid }}, (err, user) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })
}

exports.removeFollowersList = (req, res) => {
    let {userid, otheruserid} = req.body
    User.findByIdAndUpdate(userid, { "$pull" : {"followers" : otheruserid}}, (err, user) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })
}

exports.removeFollowingList = (req, res) => {
    let {userid, otheruserid} = req.body
    User.findByIdAndUpdate(otheruserid, { "$pull" : {"following" : userid}}, (err, user) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        console.log(user)
        res.status(200).json(user)
    })
}