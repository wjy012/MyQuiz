//登录注册
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const passport = require("passport")

const User = require("../../models/User")
const keys = require("../../config/keys")

//@route   GET api/users/test
//@desc    返回的请求的json数据
//@access  public
router.get("/test", (req, res)=>{
    res.json({msg:"test works"})
})

//@route   POST api/users/register
//@desc    返回的数据
//@access  public
router.post("/register", (req, res)=>{
    // console.log(req.body);
    //查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({msg: "邮箱已被注册"})
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avadar: req.body.avadar || ''
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }

        })
})

//@route   POST api/users/login
//@desc    返回token
//@access  public
router.post("/login", (req, res)=>{
    const {email, password} = req.body;
    //查询数据库
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(404).json({msg:"user dont exist!"})
            }else{
                bcrypt.compare(password, user.password)
                    .then(isMatch=>{
                        if(isMatch){
                            const rule = {
                                id: user.id,
                                name: user.name
                            }
                            jwt.sign(rule, keys.secretOrKey, {expiresIn:3600}, (err, token)=>{
                                if(err) throw err;
                                return res.json({
                                    success: true,
                                    token: "Bearer "+token
                                })
                            })
                            // return res.json({msg:"success"})
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
router.get("/current", passport.authenticate("jwt", {session:false}), (req, res)=>{
    res.json({msg:"success"})
})

module.exports = router