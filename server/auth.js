const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;








/*const routr = require('express').Router();
const User = require('./db/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi=require('joi');

routr.post('/login', async (request, response) => {
  try{
    // const error=validate(request.body);
    // if(error) return response.status(400).send(error.details[0].message)

    const user=await User.findOne({email:request.body.email})
    if(!user) return response.status(400).send("User does not exists")

    const passwordCheck=await bcrypt.compare(request.body.password,user.password)
    if(!passwordCheck) return response.status(400).send("Password does not match")

    // const token=user.generateAuthToken();
    // response.status(200).send({data:token},{message:"Login Successful"})
    console.log("success")

  }
  catch(error){
    console.error("Error creating user:", error);
    response.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

  // const validate=(user)=>{
  //   const schema=joi.object({
  //     name:joi.string().min(3).max(30).required(),
  //     email:joi.string().email().required(),
  //     password:joi.string().min(6).required(),
  //     number:joi.number().min(10).required()
  //   })
  //   return schema.validate(user)
  // }

module.exports = routr;*/

















/*const jwt = require("jsonwebtoken");
module.exports = async (request, response, next) => {
    try {
      //   get the token from the authorization header
      const token = await request.headers.authorization.split(" ")[1];
  
      //check if the token matches the supposed origin
      const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
  
      // retrieve the user details of the logged in user
      const user = await decodedToken;
  
      // pass the user down to the endpoints here
      request.user = user;
  
      // pass down functionality to the endpoint
      next();
      
    } catch (error) {
      response.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  };*/
  