//登录注册
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const User = require("../../models/User")
const keys = require("../../config/keys")
const {select, insert} = require("../../utils/query")
const {getUserByID, addAUser} = require("../../controller/userController")

//@route   POST api/users/register
//@desc    返回的数据
//@access  public
router.post("/register", (req, res)=>{
    const {UID, name, password} = req.body;
    getUserByID(UID)
    .then(user=>{
        if(user.length!==0){
            return res.status(400).json({msg:"用户已存在！"})
        }else{
            addAUser(UID, password, name)
            .then(_=>res.json({msg:"success"}))
            .catch(err=>console.log(err))
        }
    })
})

//@route   POST api/users/login
//@desc    返回token
//@access  public
router.post("/login", (req, res)=>{
    const {UID, password} = req.body;
    getUserByID(UID)
    .then(user=>{
        if(user.length === 0){
            return res.status(404).json({msg:"user dont exist!"})
        }else{
            bcrypt.compare(password, user[0].password)
                .then(isMatch=>{
                    if(isMatch){
                        const rule = {
                            UID: user[0].UID,
                            name: user[0].name
                        }
                        jwt.sign(rule, keys.secretOrKey, {expiresIn:3600}, (err, token)=>{
                            if(err) throw err;
                            return res.json({
                                success: true,
                                token: "Bearer "+token
                            })
                        })
                    }else{
                        return res.status(400).json({msg:"wrong password!"})
                    }
                })
        }
    })

})

//@route   GET api/users/current
//@desc    返回当前用户信息
//@access  private
router.get("/current", (req, res)=>{
    const token = String(req.headers.authorization).split(' ').pop();
    jwt.verify(token, keys.secretOrKey, (err, payload)=>{
        if(err) res.status(403).json('认证不通过！')
        else return res.json({msg:"success", payload})
    })
})

module.exports = router

// router.post("/register", (req, res)=>{
//     //查询数据库中是否拥有邮箱
//     User.findOne({email: req.body.email})
//         .then(user=>{
//             if(user){
//                 return res.status(400).json({msg: "邮箱已被注册"})
//             }else{
//                 const newUser = new User({
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password,
//                     avadar: req.body.avadar || ''
//                 })
//                 bcrypt.genSalt(10, function(err, salt) {
//                     bcrypt.hash(newUser.password, salt, function(err, hash) {
//                         // Store hash in your password DB.
//                         if(err) throw err;
//                         newUser.password = hash;
//                         newUser.save()
//                             .then(user => res.json(user))
//                             .catch(err => console.log(err))
//                     });
//                 });
//             }
//         })
// })

// router.post("/login", (req, res)=>{
//     const {email, password} = req.body;
//     //查询数据库
//     User.findOne({email})
//         .then(user=>{
//             if(!user){
//                 return res.status(404).json({msg:"user dont exist!"})
//             }else{
//                 bcrypt.compare(password, user.password)
//                     .then(isMatch=>{
//                         if(isMatch){
//                             const rule = {
//                                 id: user.id,
//                                 name: user.name
//                             }
//                             jwt.sign(rule, keys.secretOrKey, {expiresIn:3600}, (err, token)=>{
//                                 if(err) throw err;
//                                 return res.json({
//                                     success: true,
//                                     token: "Bearer "+token
//                                 })
//                             })
//                         }else{
//                             return res.status(400).json({msg:"wrong password!"})
//                         }
//                     })
//             }
        // })
// })

// router.get("/current", passport.authenticate("jwt", {session:false}), (req, res)=>{
//     res.json({msg:"success"})
// })