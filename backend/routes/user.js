const {Router} = require("express");
const userRouter = Router();
const z = require("zod");
// const bodyParser = require("body-parser");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = "jsonJunaidSecret";

const UserSignupValidation = z.object({
    username: z.string(),
    password: z.string(),
    firstName:z.string(),
    lastName:z.string()
})

const UserSigninValidation = z.object({
    username:z.string(),
    password:z.string()
})

// userRouter.use(bodyParser);
userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    // console.log(body);
    // console.log("recieved req.")
    const {success} = UserSignupValidation.safeParse(body);
    console.log(success)
    if(!success) return res.json({message:"Email already taken/Invalid inputs."})
    const user = await User.findOne({
        username:body.username
    })

    // console.log(user);

    if(user && user._id){
        return res.json({
            message:"User already exists."
        })
    }

    const newUser = new User({
        username:body.username,
        firstName:body.firstName,
        lastName:body.lastName
    })

    let hashedPassword = await newUser.createHash(body.password);
    newUser.password = hashedPassword;
    await newUser.save();
    // const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: newUser._id
    },JWT_SECRET)
    res.json({
        message:"User created successfully.",
        token:token
    })


})


userRouter.post("/signin",async(req,res)=>{
    const body = req.body;
    const {success} = UserSigninValidation.safeParse(body)
    if(!success) return res.json({
        message:"Invalid email and password"
    })

    const existingUser = await User.findOne({username:body.username})
    // console.log(existingUser);
    if(!existingUser) return res.status(401).json({message:"username not found"})
    if(!await existingUser.validatePassword(body.password)){
        return res.status(400).json({message:"Incorrect password."})
    }
    const token = jwt.sign({
        userId: existingUser._id
    },JWT_SECRET)
    res.status(200).json({
        token:token
    })

})

module.exports = userRouter;
