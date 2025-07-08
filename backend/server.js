import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ⬅️ Yeh import zaroori hai for __dirname
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import questionRoutes from "./routes/questionRoutes.js";

// env setup
dotenv.config();

// DB connect
connectDB();

// app init
const app = express();
const __dirname = path.resolve(); // ✅ Corrected spelling

// middlewares
app.use(cors({
  origin: "https://personal-finance-tracker-8tdm.onrender.com", // ✅ frontend link
  credentials: true, // optional: for cookies/sessions if needed
}));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/questions", questionRoutes);

// static frontend serve (React/Vite build folder)
app.use(express.static(path.join(__dirname, "frontend/dist")));

// handle all non-api routes (SPA fallback)
app.get(/^(?!\/api).*/, (req, res) => {
  // This regex matches all routes that don't start with '/api'
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
