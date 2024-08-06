import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"
export const sendMessage = async(req,res)=>{
    try {
        
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId:receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //NOTE: SOCKET IO FUNCTIONALITY WILL WRITE HERE

        // await conversation.save();
        // await newMessage.save();

        // this is same as the above two lines the difference is that this is run in parallal
        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(200).json(newMessage)
        

    } catch (error) {
        res.status(401).json({error:"something went wrong"})
        console.log("ERROR IN SEND MESSAGE CONTROLLER")
    }
}

// get message between two users
export const getMessage = async(req,res)=>{
    try {
        
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[userToChatId,senderId]}
        }).populate("messages");

        res.status(200).json(conversation.messages)


    } catch (error) {
        res.status(401).json({error:"something went wrong"})
        console.log("ERROR IN GET MESSAGE CONTROLLER")
    }
}