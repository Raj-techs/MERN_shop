const Vendor = require("../models/Vendor")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")
dotEnv.config()

const secretKey = process.env.WhatIsYourName

const vendorRegister = async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        let vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(500).send("Email already taken")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        })
        await newVendor.save()
         res.send({message:"Vendor registered Successfully"})
         console.log("register",email);

    } catch (err) {
        console.log(err)
        return res.status(500).send("vendorRegister error")
    }
}

const vendorLogin = async(req,res)=>{
    try {
        const {email,password}=req.body;
        let vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.json({error:"Invalid username or password"})
        }
        const token = jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})

        res.status(200).send({success:"Login successfull",token})
        console.log(email,"this is token",token);
        
    } catch (err) {
        console.log(err)
        res.status(500).send("vedorLogin error")
    }
}

const getAllVendors = async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('Firm')
        res.json({vendors})
    } catch (err) {
      console.log(err)
      res.status(500).json({error:"getAllVendors error"})
    }
  }

const getVendorById = async(req,res)=>{
    try {
        const venderId = req.params.apple;
        const vendor = await Vendor.findById(venderId).populate('Firm')
        if(!vendor){
            return res.status(404).send({message:"Vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (err) {
        console.log(err)
        res.status(500).send({error:"getVendorById error"})
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}