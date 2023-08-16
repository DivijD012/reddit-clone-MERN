const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {createJWT} = require("../utils/auth")

exports.signup = (req, res) => {
    
    let {fname, lname, email, username, age, contact, password} = req.body;
    User.findOne({email: email}).then(
        user=>{
            if(user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            }
            else {
                const user = new User({
                    fname:fname,
                    lname:lname,
                    email:email,
                    username:username,
                    age:age,
                    contact:contact,
                    password:password,
                    savedPosts:[],
                    followers:[],
                    following:[]
                });
                    bcrypt.hash(password, 10, function(err, hash){
                        if(err) throw err;
                        user.password = hash;
                        console.log(user.password);
                        user.save()
                        .then(response => {
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
                    })
            }
        }).catch(err =>{
            res.status(500).json({
              errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.signin = (req, res) => {
    let {email, password} = req.body;
    User.findOne({email:email}).then(user => {
        if(!user) {
            return res.status(404).json({
              errors: [{ user: "not found" }],
            });
        }
        else {
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if(err) throw err;
                console.log(isMatch);
                if(!isMatch) {
                    console.log(password)
                    console.log(user.password);
                    return res.status(400).json({ errors: [{ password:
                        "incorrect" }]
                    });
                }
                else {
                    let access_token = createJWT(
                        user.email,
                        user._id,
                        3600
                      );
                    jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                        if (err) {
                           res.status(500).json({ erros: err });
                        }
                        if (decoded) {
                            return res.status(200).json({
                               success: true,
                               token: access_token,
                               message: user
                            });
                          }
                        })
                }
            })
        }
    })
}