const express = require('express');
const mongoose = require('mongoose');
const userAuthRoute = require("./routes/UserAuth")
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the actual origin you want to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Optional: If you need to allow cookies and credentials
    console.log('App started');
    next();
})

app.use(userAuthRoute);

mongoose.connect(`mongodb+srv://Amaan:K4jN854c2cptvp4R@cluster0.uu6zbva.mongodb.net/usersDB?retryWrites=true&w=majority`).then(()=>{
    console.log('Connected');
    app.listen(3080);
}).catch(err=>console.log(err));

