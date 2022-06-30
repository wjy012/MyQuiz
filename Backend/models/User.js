const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Create Schema
//配置对象里写需要的字段
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avadar: {
        type: String
    },
})

module.exports = User = mongoose.model("users", UserSchema)