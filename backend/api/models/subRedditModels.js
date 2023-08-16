
// Import mongoose
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const redditSchema = new Schema({
    userid: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    tags: {
        type: [String]
    },
    banned_keywords: {
        type: [String]
    },
    num_follows: {
        type: Number,
        required: true
    },
    num_posts: {
        type: Number,
        required: true
    },
    joining_request : {
        type : [String]
    },
    membersBlocked : {
        type : [String]
    },
    members : {
        type: [String]
    },
    membersLeft : {
        type : [String]
    },
    time : {
        type : Number
    }
});

// create and export model
module.exports = mongoose.model("redditModel", redditSchema);