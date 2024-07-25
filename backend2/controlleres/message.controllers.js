import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message || !receiverId || !senderId) {
            throw new Error("Missing required fields");
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            recieverId: receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.error("ERROR IN MESSAGE CONTROLLER", error.message);
        res.status(401).json({ error: "Something went wrong" });
    }
}

export default sendMessage;