const jwt = require("jsonwebtoken")
const Vendor = require("../models/Vendor")
const dotEnv = require("dotenv")
dotEnv.config()
const secretKey = process.env.WhatIsYourName
const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            res.status(401).send({error:"Token not found"})
        }
        const decoded = jwt.verify(token,secretKey)
        const vendor = await Vendor.findById(decoded.vendorId)
        console.log(vendor)
        if(!vendor){
            res.status(401).send({error:"vendor not found"})
        }
        req.vendorId = vendor._id
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send({error:"verifyToken error"})
    }
}

module.exports=verifyToken