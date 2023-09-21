const jwt = require("jsonwebtoken");

exports.isAuth = (req,res,next)=>{


    const token = req.get('Authorization').split(" ")[1];
    let decodedToken;
    try{
 decodedToken = jwt.verify(token,"SOMETHINGSECRET");
    }
    catch{
        let error = new Error("Internal Server Authentication Failed")
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken){
        let error = new Error("Authentication Failed")
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}