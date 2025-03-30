const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../services/token");
const cookieParser = require("cookie-parser");

const express = require("express");
const upload = require("../services/imageUpload");
const app = express();
app.use(cookieParser());

const Signup = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message, success: false });
        }
        const { username, email, password } = req.body;
        const profilePic = req.file.path
        // const profilePic = "file.path";

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await User.create({
                username,
                email,
                password: hashedPassword,
                profilePic,
            });

            const token = generateToken({ email, username, profilePic });

            res.cookie("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            });

            return res.status(201).json({ message: "Signup Successful",token:token ,success: true });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
};

const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password", success: false });
    }
    const token = generateToken({
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
    });
    if (!token) {
        return res.status(500).json({ message: "Token generation failed", success: false });
    }

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login Successful", success: true });
};

const getAllUSers = async(req,res)=>{
    try {
        const users = await User.find();
        res.json({ users, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = { Signup, Login,getAllUSers };
