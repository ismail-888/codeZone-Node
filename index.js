require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const httpStatusText=require('./utils/httpStatusText')
const url = process.env.MONGO_URL;
const cors=require('cors')

mongoose.connect(url).then(() => {
  console.log("mongdb server started");
});
app.use(cors())
app.use(express.json());

const coursesRouter = require("./routes/courses_route");
const usersRouter = require("./routes/users_route");

app.use("/api/courses", coursesRouter);
app.use('/api/users',usersRouter);

// Global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({status:httpStatusText.ERROR,message:'this resource is not availble'})
});

//Global error handler
app.use((error,req,res,next)=>{
  res.status(error.statusCode || 500).json({status:error.statusText || httpStatusText.ERROR,message:error.message,code:error.statusCode || 500,data:null})
})

app.listen(process.env.PORT || 4000, () => {
  console.log("http://localhost:4000");
});
