
// Import mongoose
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const postSchema = new Schema({
    postedById: {
        type:String
    },
    postedByName: {
        type:String
    },
    postedInId: {
        type:String
    },
    postedInName: {
        type:String
    },
    text: {
        type:String
    },
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
    upvoteList: {
        type:[String]
    },
    downvoteList: {
        type:[String]
    },
    comments : {
        type: [String]
    }
});

// create and export model
module.exports = mongoose.model("postModel", postSchema);