import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL,(err)=>{
    if(err) console.log("error in connection")
    console.log("Db connection successfully")
})