const User = require("../models/user-model")
const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
const secretKey = process.env.WhatIsYourName

const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).send({message:"token is required"})
    }
    try {
        const decoded = jwt.verify(token,secretKey);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).send({error:"user not found"})
        }
        req.userId = user._id
        next()
    } catch (err) {
        console.log(err);   
        return res.status(500).json({error:"verifyToken internal error"})
    }
}

module.exports = verifyToken