import express from 'express'
import connectToMongoDb from './db/connectDb.js';
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cookieParser())
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/messages",messageRoute)



app.listen(port,()=>{
    connectToMongoDb();
    console.log("server is running on port :",port)
})