import jwt from 'jsonwebtoken'
import User from "../models/user.models.js"

const protectRoute =async (req,res,next)=>{
    try {

        const token = req.cookie.jwt;

        if(!token){
            return res.status(401).json({error:"Unathorized : No Token Provided"})
        }

        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decodeToken){
            return res.status(401).json({error:"Unathorized : Invalid Token"})
        }

        const user = await User.findOne(decodeToken.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"User Not Found"})
        }

        req.user = user;

        next(); // this will run the next function in route file which is sendMessage

    } catch (error) {

        console.log("ERROR IN PROTECT ROUTE AND ERROR IS: ",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export default protectRoute;