import express from "express";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import courseRouter from "./routes/courseRouter";
import mongoose, { connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import jsonWebToken from "jsonwebtoken";
const jwt = jsonWebToken;

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to database is successful");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(`Unable to connect to database due to: ${error}`);
  }
}
connectDB();
