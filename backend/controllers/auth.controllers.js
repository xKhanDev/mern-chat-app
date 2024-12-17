import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from '../models/user.models.js';

const generateAccessToken =(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"15d"
    })
}

export const signup = async (req, res) => {
    try {
        // console.log(req.body);
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // hashing password for security reason
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyAvatar : girlAvatar,
        });

        if(newUser){ 
            // {userId:newUser._id} === const payload = {userId:newUser._id} 👇
            // generateTokenAndSetCookies(payload,res)
            generateAccessToken(newUser._id);
            await newUser.save();
            

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });
        }else{
            res.status(200).json({error:"Invalid user data, done"})
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        console.error("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {userName,password} = req.body;
        console.log(userName,password)
    
        if(!userName || !password){
            return res.status(400).json({error:"All Feilds are Required"});
        }
        
        const user = await User.findOne({userName:userName});
        console.log(user)
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"invalid Credential"})
        }

        const accessToken = generateAccessToken(user._id);

        res.cookie("accessToken",accessToken,{httpOnly:true,secure:true});

        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("error in login controller",error.message)

        res.status(500).json({error:"Internal server error"});
    }
};

export const logout = async(req, res) => {
    try {
        
        res.cookie("accessToken","",{maxAge:0});
        res.status(200).json({message:"Logout Succefully"})

    } catch (error) {
        console.log("error in logout controller",error.message)

        res.status(500).json({error:"Internal server error"});
    }
};
