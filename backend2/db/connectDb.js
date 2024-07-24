import mongoose from "mongoose";
const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(("Successfully Connected to Mongo DB"))
    } catch (error) {
        console.log("Not connected to mongoDb",error.message);
    }
}

export default connectToMongoDb;