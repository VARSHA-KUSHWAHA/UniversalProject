const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
console.log("process.env.PORT",process.env.PORT);
const userRouter=require("./routes/user.route");
app.use("/",userRouter);
app.listen(process.env.PORT, function () {
  console.log(`server listening on process.env.PORT http://localhost:${process.env.PORT}`);
});
