import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import questionRoutes from "./routes/questionRoutes.js";
// env setup
dotenv.config();

// db connect
connectDB();

// app init
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/questions", questionRoutes);

// listen
app.listen(5000, () => console.log("Server started on port 5000 🚀"));
