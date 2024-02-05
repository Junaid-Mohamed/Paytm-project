const express = require("express");
const { Account } = require("../db");
const { authMiddleWare } = require("../middlewares");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();


accountRouter.get('/balance',authMiddleWare,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })

    res.json({
        message:`Balance ${account.balance}.Rs`
    })
})

// tricky bit.
// expected body : to:string(id), account :numnber
accountRouter.post("/transfer",authMiddleWare,async(req,res)=>{
    // bad solution 
    // which doesn't consider concurrent txns and partially executed txns.
    // node and db are always up is the assumptions here, which is a bad assumption.
   try {
    const {amount,to} = req.body;
    const account = await Account.findOne({userId:req.userId})

    if(account.balance < amount ){
        return res.status(400).json({
            message:"Insufficient balance."
        })
    }

    const toAccount = await Account.findOne({userId:to})

    if(!toAccount){
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    await Account.updateOne({
        userId:req.userId
    },
    {
        $inc:{
            balance: -amount
        }
    }
    )

    await Account.updateOne({userId:to},
        {
            $inc:{
                balance:amount
            }
        })

    res.json({
        message:"Transfer succesfull."
    })
   } catch (error) {
        console.log("error",error);
        return res.status(400).json({
            message:"Error in transfer."
        })
   }
    
})

// good solution which handles the edge case.
accountRouter.post("/v2/transfer",authMiddleWare,async(req,res)=>{
    try {
        const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    const account = await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insuffiecient balance / Account not found"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"receiver Account not found"
        })
    }

    await Account.updateOne({userId:req.userId},{$in:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    // commit the txns

    await session.commitTransaction();
    res.json({message:"Transfer Successfull."})
    } catch (error) {
        console.log("error",error);
        return res.status(400).json({
            message:"Error in transfer. No money has left your bank."
        })
    }
    
})




module.exports = accountRouter;