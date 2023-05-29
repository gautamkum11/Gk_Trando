import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.mongo_url);
        console.log("Successfully connected to database");
    }catch(err){
        console.log("Not connected to Database");
    }
}

export default connectDB;