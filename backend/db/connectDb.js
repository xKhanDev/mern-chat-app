import mongoose, { connect } from "mongoose";

const connectToMangoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Succefully Connected to MongoDB");
    } catch (error) {
        console.log("Error while connecting to MongoDb", error.message);
    }
}

export default connectToMangoDb;