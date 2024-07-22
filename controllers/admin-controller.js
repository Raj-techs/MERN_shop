const Admin = require("../models/admin-model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// import _default from "concurrently";
// import dotenv from "dotenv";

// dotenv.config();

// const secretKey = process.env.SECRET_KEY;

const adminRegister = async (req, res) => {
  const { Name, email, password } = req.body;
  // if (mobileNo.length !== 10) {
  //   return res.status(400).json({ message: "Mobile number must be 10 digits" });
  // }
  try {
    const existingUser = await Admin.findOne({ Name });
    const adminEmail = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (adminEmail) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      Name,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registerd successfilly" });
    console.log(" admin registerd successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //jwt token generation
    // const token = jwt.sign({ userId: user._id }, secretKey, {
    //   expiresIn: "1h",
    // });

    res.status(200).json({ message: "Login Successfull" });
    console.log("login successfull \n");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports =  { adminRegister, adminLogin };
