const express = require("express")
const mongoose = require("mongoose")
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const passport = require("passport")
const app = new express()

//引入user.js
const users = require("./routes/api/users")

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DB config
const {mongoURI, mysqlOpt} = require("./config/keys")
//connect to mongodb
mongoose.connect(mongoURI).then(()=>{
    console.log("MongoDB Connected!");
}).catch(err=>{
    console.log(err);
})

// const mysqlConn = mysql.createPool(mysqlOpt)
// console.log("mysql connected!");
// mysqlConn.connect(err=>{
//     if(err){
//         console.log(err);
//     }
//     else  console.log("mysql connected!");
// })


//passport初始化
app.use(passport.initialize())
//配置passport
require("./config/passport")(passport)

//使用routes
app.use("/api/users", users)

const port = 8080;

app.listen(port, ()=>{
    console.log("running on port 8080...");
})