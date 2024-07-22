// import {
//   bloodBankRegister,
//   bloodBankLogin,
// } from "../controllers/blood-bank-controller.js";
const bloodbankController = require("../controllers/blood-bank-controller.js")
const express = require("express")
const router = express.Router();

router.post("/register", bloodbankController.bloodBankRegister);
router.post("/login", bloodbankController.bloodBankLogin);

module.exports = router;
