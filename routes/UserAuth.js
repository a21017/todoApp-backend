
const express = require("express");
const { signUp, login, userProfile } = require("../controllers/UserAuth");
const { isAuth } = require("../controllers/isAuth");

const router = express.Router();

router.post('/signup',signUp);

router.post('/login',login);

router.get("/userProfile",isAuth,userProfile);



module.exports = router;