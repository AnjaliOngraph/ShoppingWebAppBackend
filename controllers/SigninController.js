require("dotenv").config();
require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const User = require("../models/siginSchema");

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, cpassword } = req.body; // Get user input

    if (!(email && password && first_name && last_name && cpassword)) {
      res.status(400).json({ message: "Enter complete details" }); // Validate user input
    }

    if (password !== cpassword) {
      res.status(400).json({ message: "password doesnot match" });
    }

    const oldUser = await User.findOne({ email }); // Validate if user exist in our database

    if (oldUser) {
      return res
        .status(401)
        .json({ message: " Already have a account with this Email." });
    }

    const user = await User.create({
      first_name, // Create user in our database
      last_name,
      email: email.toLowerCase(),
      password,
      cpassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_KEY
    );

    console.log(token);
    console.log(user);

    res.status(201).json(user); // return new user
  } catch (err) {
    console.log(err);
    // return new user

  }
};

exports.loginUser= async(req,res)=>{
    try {
        console.log("login api");
        const { email, password } = req.body; // Get user input
        if (!(email && password)) {
          // Validate user input
          res.status(400).json({ message: "fill all details" });
        }
    
        const user = await User.findOne({ email }); // Validate if user exist in our database
    
        if (user && (await bcrypt.compare(password, user.password))) {
          console.log("tokenn.......");
          const token = await user.generateAuthtoken();
    
          console.log(token);
    
          await user.save();
    
          const result = {
            user,
            token,
          };
    
          console.log(result);
    
          res.status(200).json(result);
        }
        if(!user){
          console.log("user not found");
          res.status(400).json("user not found");
        } 
         if(bcrypt.compare(password, user.password)) {
          console.log("wrong password");
          res.status(401).json("wrong password");
        }
      } catch (err) {
        console.log(err);
      }
}

