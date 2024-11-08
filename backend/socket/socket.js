import { Server } from "socket.io";
import http from "http";
import express from "express"

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["POST","GET"]
    }
})

export const getRecieverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {} ; //socketId:userID

io.on('connection',(socket)=>{
    console.log(`a user is connected to ${socket.id}`)

    // getting user from frontend and assign to socket id
    const userId = socket.handshake.query.userId;
    if(userId !== "undefined") userSocketMap[userId] = socket.id;

    // use to send event to all connected users
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    // socket.on is used to listen client and server side events
    socket.on("disconnect",(socket)=>{
        // console.log(`user disconnected ${socket.id}`)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })

    socket.on("error",(error)=>{
        console.log("error in socket connection",error.message)
    })
})

export {app,io,server}