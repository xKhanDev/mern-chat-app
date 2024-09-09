import jwt from "jsonwebtoken";
import User from "../models/user.models.js"
const protectRoute = async(req,res,next)=>{

    try {
        const token = req.cookies?.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }

        const user =await User.findById(decodeToken.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User NOt Found"})
        }

        req.user = user;

        next();


    } catch (error) {
        
        console.log("ERROR IN PROTECT ROUTE AND ERROR IS: ",error.message);
        res.status(500).json({error:"Internal server error"})
    }

}

export default protectRoute;