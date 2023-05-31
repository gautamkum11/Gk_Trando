import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/conn.js";
import router from "./router/route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api",router);

const port = process.env.PORT;

app.get("/",(req,res) => {
    res.status(201).json("Hello world");
})


app.listen(port,()=>{
    console.log(`server connected to http://localhost:${port}`);
})