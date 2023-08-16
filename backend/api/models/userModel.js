
// Import mongoose
    const mongoose = require("mongoose");

    mongoose.set('strictQuery', true);
// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const userSchema = new Schema({
        fname:{
            type:String,
            required:true
        },
        lname:{
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true,
            unique:true
        },
        username: {
            type:String,
            required:true
        },
        age: {
            type:Number,
            required:true
        },
        contact: {
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        },
        savedPosts: {
            type: [String]
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        }
    });

// create and export model
module.exports = mongoose.model("userModel", userSchema);