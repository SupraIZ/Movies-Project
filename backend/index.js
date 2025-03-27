import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

//Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import genreRoutes from "./routes/genreRoutes.js";
 
//Config
dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genres", genreRoutes);

app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});

