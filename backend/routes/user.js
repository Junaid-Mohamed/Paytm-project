const {Router} = require("express");
const userRouter = Router();
const z = require("zod");
// const bodyParser = require("body-parser");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const { authMiddleWare } = require("../middlewares");
require("dotenv").config();
const JWT_SECRET = "jsonJunaidSecret";

// zod validation code
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

const UserUpdateValidation = z.object({
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})


userRouter.post("/authenticate",authMiddleWare,async(req,res)=>{
    
    
    const authenticatedUser = await User.findOne({_id:req.userId})
    const authenticatedUserAccount = await Account.findOne({userId:req.userId}) 
   
    if(authenticatedUser && authenticatedUserAccount){
        return res.status(200).json({
            username:authenticatedUser.username,
            balance:authenticatedUserAccount.balance
        })
    }
    res.status(403).json({
        message:"Access forbidden"
    })
    
})


  // if(!authenticatedUser){
        
    //     return res.status(403).json({
    //         message:"not logged in"
    //     })
    // }
    // res.status(200).json({
    //     username:authenticatedUser.username
    // })

// userRouter.use(bodyParser);
userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = UserSignupValidation.safeParse(body);
    if(!success) return res.json({message:"Email already taken/Invalid inputs."})
    const user = await User.findOne({
        username:body.username
    })

   

    if(user && user._id){
        return res.json({
            message:"Username already exists."
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

    // --create new account

    await Account.create({
        userId:newUser._id,
        balance:Math.round(1+Math.random()*1000)
    })
    const token = jwt.sign({
        userId: newUser._id
    },JWT_SECRET)
    res.status(200).json({
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

// should set proper route for updating password.
userRouter.put("/update",authMiddleWare,async (req,res)=>{
    const body = req.body;
    const {success} = UserUpdateValidation.safeParse(body);
    if(!success) res.status(411).json({message:"Update failed..try again"})
    // console.log(req.userId);
    await User.updateOne({_id:req.userId},{$set:body})
    res.status(200).json({message:"update was successfull"})
})


// to filter and get users 
//  select * from Users u where u.firstName or u.lastName like "%like%" in sql
userRouter.get("/bulk",async(req,res)=>{
    // console.log(req.body)

    // if you writing req.param.filer
    //  then API will be /bulk/:filter
    const filter = req.query.filter || "";
    // console.log(filter);
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },
        {
            lastName:{
                "$regex":filter
            }
        }]
    })
    // console.log(users);
    // indexing is better serach way to do this search.
    if(users.length == 0) return res.status(403).json({message:"User Not found"})
    // check stack over flow how to do two queries at the same time.
    res.json({
        user: users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        })

        )
    })

})

module.exports = userRouter;
