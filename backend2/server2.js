import express from 'express'
import connectToMongoDb from './db/connectDb.js';
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();


// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use("/api/v1/auth",authRoute)



app.listen(port,()=>{
    connectToMongoDb();
    console.log("server is running on port :",port)
})