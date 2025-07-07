import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

// listen
app.listen(5000, () => console.log("Server started on port 5000 🚀"));
