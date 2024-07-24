import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyAvatar : girlAvatar,
        });

        if (!newUser) {
            return res.status(400).json({ error: "Invalid user data" });
        }

        const payload = {
            userId: newUser._id,
        };

        generateTokenAndSetCookie(payload, res);

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        console.error("Error in signup controller : ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async(req, res) => {
    try {
        
        const {userName , password} = req.body;

        if(!userName || !password){
            res.status(400).json({error:"all feilds are required"})
        }

        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user){
            res.status(404).json({error:"user not found"})
        }

        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"invalid credentials"})
        }

        generateTokenAndSetCookie({userId:user._id},res);

        res.status(200).json({
            id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        console.log("Error in login Controller",error.meesage);

        res.status(500).json({error:"internal server error"})
    }
};

export const logout = (req, res) => {
    try {
        
        jwt.cookie("jwt","",{maxAge:0});
        
        res.status(200).json({message:"Logout Succefully"})

    } catch (error) {
        console.log("Error in login Controller",error.meesage);

        res.status(500).json({error:"internal server error"})
    }
};
