
const express = require("express");
const { signUp, login, userProfile, addTask, getUserData, deleteTask,markCompleted } = require("../controllers/UserAuth");
const { isAuth } = require("../controllers/isAuth");

const router = express.Router();

router.post('/signup',signUp);

router.post('/login',login);

router.get('/userData',isAuth,getUserData);

router.post('/addTask',isAuth,addTask);

router.post('/deleteTask',isAuth,deleteTask);

router.post('/markCompleted',isAuth,markCompleted);


module.exports = router;