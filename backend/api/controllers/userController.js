const  User = require("../models/userModel");

exports.listAllUsers = (req, res) => {

User.find({}, (err, user) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(user);
});
};

// createNewTodo function - To create new todo
exports.createNewUser = (req, res) => {
// console.log(req.body)
let  newUser = new User (req.body);
newUser.save((err, user) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(user);
});
};

exports.updateUser = (req, res) => {
    // console.log("Hey")
    User.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, user) => {
    if (err) {
    res.status(500).send(err);
    }
    res.status(200).json(user);
    }).clone().catch(function(err){ console.log(err)});
};

exports.deleteUser = async ( req, res) => {
await  User.deleteOne({ _id:req.params.id }, (err) => {
if (err) {
return res.status(404).send(err);
}
res.status(200).json({ message:"User successfully deleted"});
}).clone().catch(function(err){ console.log(err)});
};