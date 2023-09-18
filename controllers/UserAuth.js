const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = (req,res,next)=>{

  console.log(req.body);
   User.findOne({email:req.body.email})
   .then((user)=>{
    if(!user){
        return res.status(401).json({"message":"User doesnt exist!"});
    }

    bcrypt.compare(req.body.password,user.password)
    .then((result)=>{
      if(result){

        console.log("Logged in Successfully")
        const token = jwt.sign({email:user.email,userId:user.userId},"SOMETHINGSECRET",{expiresIn:'1h'});
       return res.status(200).json({token:token});

      }
      return res.status(401).json({"message":"Invalid password!"})
    })
    .catch((err)=>{
        return res.status(401).json({"message":"Invalid email or password"});
    })
   })
   .catch((err)=>{
    return res.status(500);
   })

}

exports.signUp = (req, res, next) => {

  console.log(req.body)
  bcrypt.hash(req.body.password, 12)
    .then((hashedPass) => {
      const user = new User({
        userId: req.body.userId,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPass,
      });

      user
        .save()
        .then(() => {
          console.log("Added User");
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
        res.sendStatus(500)
    });
};


exports.userProfile = (req,res,next)=>{

    res.json({message:`Hello! ${req.userId}`});
}