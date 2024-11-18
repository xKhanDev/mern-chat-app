import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import express from "express";

import connectToMangoDb from './db/connectDb.js'

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js";

import bodyParser from 'body-parser';
import { app, server } from './socket/socket.js';

const port = process.env.PORT || 8000;

dotenv.config();

app.use(cors())

const __dirname = path.resolve();
app.use(bodyParser.json()); // to accept json data from body(req.body)
app.use(cookieParser())  // before runing the below middleware we will access the cookie


// middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(port, () =>{
    connectToMangoDb();
    console.log("server is running on port: ", port)
})