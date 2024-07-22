const adminController = require("../controllers/admin-controller.js")
const express = require("express")
const router = express.Router();

router.post("/register", adminController.adminRegister);
router.post("/login", adminController.adminLogin);

module.exports =  router;
