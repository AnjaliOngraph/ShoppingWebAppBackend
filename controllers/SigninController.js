require("dotenv").config();
require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const nodemailer = require("nodemailer");

const User = require("../models/siginSchema");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anshisofftrack@gmail.com",
    pass: "labktupsiusiwuvo",
  },
});

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

      const result = {
        user,
        token,
      };

      res.status(201).json(result);
  } catch (err) {
    console.log(err);
    // return new user
  }
};

exports.loginUser = async (req, res) => {
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

      res.status(200).json(result);
    }
    if (!user) {
      console.log("user not found");
      res.status(400).json("user not found");
    }
    if (bcrypt.compare(password, user.password)) {
      console.log("wrong password");
      res.status(401).json("wrong password");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.forgotPassword= async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your Email" });
  }

  try {
    const user = await User.findOne({ email });

    console.log(user,"user");

    if (!user) {
      res.status(400).json("User not registered");
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "15m",
    });

    const setusertoken = await User.findByIdAndUpdate(
      { _id: user._id },
      { verifytoken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: "anshisofftrack@gmail.com",
        to: email,
        subject: "Sending Email for password Reset",
        text: `This Link is Valid for 15 minutes http://localhost:3000/reset-password/${user.id}/${setusertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("email not send");
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email Sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "email send successfully" });
        }
      });
    }
    // console.log("link:" ,` http://localhost:3000/reset-password/${user.id}/${setusertoken.verifytoken}`);
  } catch (error) {
    res.status(400).json({ status: 401, message: "invalid user" });
  }
  // res.send(email);
};

// exports.getresetPassword = async (req,res)=>{
//   const { id, token } = req.params;

//   try {
//     const validuser = await User.findOne({ _id: id, verifytoken: token });

//     const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);

//     if (validuser && verifyToken._id) {
//       res.status(201).json({ status: 201, validuser });
//     } else {
//       res.status(401).json({ status: 401, message: "user not exist" });
//     }
//   } catch (error) {
//     res.status(401).json({ status: 401, message: "error" });
//   }
// }

exports.resetPassword= async (req, res) => {
  const { id, token } = req.params;
  const { password, cpassword } = req.body;

  try {
    const user = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);

    if (user && verifyToken._id && password === cpassword) {
      const newPassword = await bcrypt.hash(password, 12);

      const setnewpassword = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );

      setnewpassword.save();

      res.status(201).json({ status: 201, setnewpassword });
    } else if (cpassword !== password) {
      res.status(401).json({ status: 401, message: "passwords doesnot match" });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }

  // res.send(req.params);
};