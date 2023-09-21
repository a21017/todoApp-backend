const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = (req,res,next)=>{

   User.findOne({email:req.body.email})
   .then((user)=>{
    if(!user){
        return res.status(401).json({"message":"User doesnt exist!"});
    }

    bcrypt.compare(req.body.password,user.password)
    .then((result)=>{
      if(result){

        console.log("Logged in Successfully")
        const token = jwt.sign({userId:user._id},"SOMETHINGSECRET",{expiresIn:'1h'});
       return res.status(200).json({token:token,userId:user._id});

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

  bcrypt.hash(req.body.password, 12)
    .then((hashedPass) => {
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPass,
        userTasks:[]
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



exports.getUserData = (req,res,next)=>{

  User.findOne({_id:req.userId})
  .then((user)=>{

    if(user){
      
      res.status(200).json({tasks:user.userTasks,userName:user.userName});
    }
  })
  .catch(()=>{

  })

}

exports.addTask = (req,res,next)=>{

  const userId = req.userId;

  User.findOne({_id:userId})
  .then((user)=>{

    if(user){
      let task = {title:req.body.title,detail:req.body.detail};

      user.userTasks.push(task);

      return user.save()
      .then((result)=>{
        res.status(201).json({tasks:result.userTasks})
      });
    }

    return res.status(401).json({message:"User doesnt exists!"})

  })
  .catch(()=>{
    res.status(500).json({error:"Internal Server Error!"})
  })
  
}

exports.deleteTask = (req,res,next)=>{

  const userId = req.userId;

  User.findOne({_id:userId})
  .then((user)=>{

    if(user){
      let taskId = req.body.taskId;

       user.userTasks = user.userTasks.filter((task)=>task._id.toString() !== taskId.toString());

      return user.save()
      .then((result)=>{
        res.status(200).json({tasks:result.userTasks})
      });
    }

    return res.status(401).json({message:"User doesnt exists!"})

  })
  .catch(()=>{
    res.status(500).json({error:"Internal Server Error!"})
  })
  
}