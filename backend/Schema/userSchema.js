import mongoose, { Schema } from "mongoose";

// mongoose is the ODM.

// user schema


const userSchema = new Schema({
    username:{
        type:String,
        minLength:5,
        maxLength:15,
        required:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        maxLength:15,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxLength:15,
        trim:true
    },
    password:{
        type:String,
        minLength:5,
        maxLength:15,
        required:true,
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;