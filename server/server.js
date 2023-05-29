import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/conn.js";
import router from "./router/route.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get("/",(req,res) => {
    res.status(201).json("Hello world");
})

app.use("/api",router);

app.listen(port,()=>{
    console.log(`server connected to http://localhost:${port}`);
})