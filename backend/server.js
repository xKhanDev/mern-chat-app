import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToMangoDb from './db/connectDb.js'

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

// import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();


app.use(express.json()); // to accept json data from body(req.body)
app.use(cookieParser())  // before runing the below middleware we will access the cookie

// middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);


// app.get("/", (req, res) => {
//     res.send("hello world !!")
// });


app.listen(port, () =>{
    connectToMangoDb();
    console.log("server is running on port: ", port)
})