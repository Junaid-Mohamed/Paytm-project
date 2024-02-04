const {Router} = require("express");
const router = Router();
const userRouter = require("./user")


router.use("/user",userRouter);


module.exports = router;

// requests would like this
// /api/v1/{anything}