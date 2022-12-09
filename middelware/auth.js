const jwt = require("jsonwebtoken");
const User = require("../models/siginSchema");

const verifyToken = async (req, res, next) => {
  const {authorization} = req.headers
  console.log("authorization",authorization)
  if(!authorization){
    return res.status(401).json({error:"You must be logged in!"})
  }
  const token = authorization.replace("Bearer ","")
  jwt.verify(token, process.env.TOKEN_KEY, (err,payload)=> {
    if(err){
      return res.status(401).json({error: " You must be logged in!"})
    }

    const {_id}= payload
    User.findById(_id).then(userdata => {
      req.user = userdata;
      next();  
    })
    
  }) 
};

module.exports = { verifyToken };
