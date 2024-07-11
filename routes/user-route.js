// import { userRegister, userLogin } from "../controllers/user-controller.js";
const UserController = require("../controllers/userController.js")
const express = require("express");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.post("/request",UserController.RequestUser);
router.get("/myprofile",verifyToken,UserController.UserData);


module.exports= router;
