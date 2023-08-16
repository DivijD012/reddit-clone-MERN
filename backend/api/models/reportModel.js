
// Import mongoose
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const reportSchema = new Schema({
    userReportedId: {
        type:String,
        required:true
    },
    userReportingId: {
        type:String,
        required:true
    },
    userReportedName: {
        type: String,
        required:true
    },
    userReportingName: {
        type: String
    },
    redditId : {
        type: String
    },
    postId: {
        type: String,
    },
    redditName: {
        type: String,
        required: true
    },
    postText : {
        type : String
    },
    complaint : {
        type : String
    }
});

// create and export model
module.exports = mongoose.model("reportModel", reportSchema);