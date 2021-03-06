const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt")
const mongoose = require("mongoose")
const User = mongoose.model("users")
const keys = require("./keys")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        User.findById(jwt_payload.id)

    }))
}