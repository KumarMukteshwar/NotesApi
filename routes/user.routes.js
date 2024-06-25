const express = require('express');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();

router.post('/register', async(req, res) => {
  const {name,email,phone,address,password,gender} = req.body;
  try {
    bcrypt.hash(password,5,async(err,hash) => {
        if (err) {
            res.status(500).send("Error in hashing password");
        } else {
        const user = new UserModel({ name,email,phone,address,password:hash,gender });
        await user.save();
        res.status(200).send("User is registered successfully");
        }
    });
  } catch (error) { 
    res.status(500).send("Internal Server Error");
  }
});

router.post('/login',async(req,res) => {
  const {email,password} = req.body;
  try {
    const user = await UserModel.findOne({email:email});
    if (user) {
      bcrypt.compare(password,user.password,async(err,result) => {
        if (err) {
          res.status(500).send("Internal Server Error");
        }
         if (result) {
          const token = jwt.sign({email:user.email,id:user._id,name:user.name},process.env.JWT_SECRET);
          res.status(200).send({"msg":"Login Successful","token: " : token});
        } else {
          res.status(401).send("Your Password is incorrect");
        }
      });
    }
     else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

