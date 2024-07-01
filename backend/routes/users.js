const express = require("express");
require('dotenv').config();
const router = express.Router();
const zod = require("zod");
const User = require("../db1");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post("/signup",async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg : "Invalid inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    });
    if(existingUser){
        return res.status(400).json({
            msg: "Mail already exists"
        })
    }

    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        username,
        password:hashedPassword,
        firstName,
        lastName
    });
    const userId = newUser._id;

    const token = jwt.sign({
        userId:userId
    },process.env.ACCESS_TOKEN_SECRET)
    res.json({
        token : token,
        msg: "User created successfully"
    })
});

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ msg: "Invalid inputs" });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
        return res.status(411).json({ msg: "No username available. Please check your email or signup" });
    }

    const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
    if (isMatch) {
        const token = jwt.sign({ userId: existingUser._id }, process.env.ACCESS_TOKEN_SECRET);
        req.session.token = token; // Store token in session
        return res.status(200).json({ token: token });
    } else {
        return res.status(411).json({ msg: "You have entered wrong password" });
    }
});


module.exports = router;