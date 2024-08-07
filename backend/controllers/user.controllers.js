import User from "../models/user.models.js";

export const getUserForSidebar = async(req,res)=>{
    try {
        
        const loggedInUserId = req.user._id;

        // retrieve all users accept me
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)

    } catch (error){
        console.log("ERROR IN getUserSidebar",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
}