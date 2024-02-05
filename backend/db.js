const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
const userSchema = mongoose.Schema({
    username:{
        type:String,
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
        required:true,
    }
})

// generate hash from plain pasword.
userSchema.methods.createHash = async(password)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password,salt);
    //  or can create like this
    // return await bcrypt.hash(password,saltRounds)
} 

// Validating the user password with stored hash and hash function
userSchema.methods.validatePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
  };



const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model('Accoun',accountSchema)
const User = mongoose.model('User',userSchema);

module.exports = {User,Account};