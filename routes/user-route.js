// import { userRegister, userLogin } from "../controllers/user-controller.js";
<<<<<<< HEAD
const UserController = require("../controllers/user-controller.js")
=======
const UserController = require("../controllers/userController.js")
>>>>>>> decdbbf347bea223ac7558e468064e88b7874b83
const express = require("express");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
<<<<<<< HEAD
router.post("/request",UserController.userRequest);
=======
router.post("/request",UserController.RequestUser);
>>>>>>> decdbbf347bea223ac7558e468064e88b7874b83
router.get("/myprofile",verifyToken,UserController.UserData);


module.exports= router;
