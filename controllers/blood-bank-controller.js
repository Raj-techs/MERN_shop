const BloodBank = require("../models/blood-bank-model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const bloodBankRegister = async (req, res) => {
  const {
    BloodBankName,
    ParentHospitalName,
    password,
    category,
    firstRegistrationDate,
    LicenseNo,
    fromDate,
    ToDate,
    contactPerson,
    contactPersonEmail,
    contactNo,
    state,
    district,
    city,
    address,
    pincode,
  } = req.body;

  try {
    const existingUser = await BloodBank.findOne({ BloodBankName });
    const BankAdminEmail = await BloodBank.findOne({ contactPersonEmail });
    const BloodBankContact = await BloodBank.findOne({ contactNo });
    if (existingUser) {
      return res.status(400).json({ message: "bloodbank already exists" });
    }
    if (BankAdminEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (BloodBankContact) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBloodBank = new BloodBank({
      BloodBankName,
      ParentHospitalName,
      password: hashedPassword,
      category,
      firstRegistrationDate,
      LicenseNo,
      fromDate,
      ToDate,
      contactPerson,
      contactPersonEmail,
      contactNo,
      state,
      district,
      city,
      address,
      pincode,
    });
    await newBloodBank.save();

    res.status(201).json({ message: "BloodBank registerd successfully" });
    console.log("BB registerd successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const bloodBankLogin = async (req, res) => {
  const { contactPersonEmail, password, contactNo } = req.body;
  try {
    const bloodBank = await BloodBank.findOne({ contactPersonEmail });
    if (!bloodBank || !(await bcrypt.compare(password, bloodBank.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (bloodBank.contactNo !== contactNo) {
      return res.status(401).json({ error: "Invalid contact number" });
    }

    // If authentication succeeds, you can generate a JWT token here if needed
    // const token = jwt.sign({ bloodBankId: bloodBank._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login Successful" });
    console.log("Login Successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const addDonar = async(req,res)=>{
  try {
    const{username,group,location,age,mobileNo}= req.body;
    
  } catch (err) {
    
  }
}
module.exports =  { bloodBankRegister, bloodBankLogin };
