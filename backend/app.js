const express = require("express");
const mainRouter = require("./routes/indnex")
const cors = require("cors")
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(process.env.PORT,()=>console.log("Server listening on port",process.env.PORT))
