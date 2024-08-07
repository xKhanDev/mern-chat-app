import User from "../models/user.models.js";

export const getUserForSidebar = async(req,res)=>{
    try {

        const loggedInUserId = req.user._id;

        // return every user accept loggedIn user means accept me
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUser);
        
    } catch (error) {
        res.status(500).json({error:"internal server error"})
        console.log("ERROR IN getUserForSidebar:",error.message);
        
    }
}