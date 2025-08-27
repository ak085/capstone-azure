const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const validateMiddleware = require("../middlewares/validateMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

// admin web service to get user by email require jwt, get all fields except password
router.get('/', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.getUserByEmail);
router.get('/all', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.getEveryUser);
router.post('/filter', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.filterUsersBySearchKey);

// admin web service to get user by id require jwt, get all fields except password
router.get('/:userid', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.getUserById);

// admin web service to update user require jwt
router.put('/update', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, bcryptMiddleware.hashPasswordIfProvided, userController.updateUser);

// admin web service to delete user require jwt
router.delete('/delete', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.deleteUser);

// public web service to login, submit credentials to get return json web token
router.post("/login", validateMiddleware.validateUserLogin, userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

// public web service to register new default role user and get return json web token 
router.post("/register", validateMiddleware.validateUserRegister, userController.checkEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;