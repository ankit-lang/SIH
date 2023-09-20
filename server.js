import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";

const app = express();
//middleware
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/", router);

//database
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
mongoose.connect(MONGO_URI).then((data) => {
  console.log(`db connected to host ${data.connection.host}`);
  app.listen(PORT, () => {
    console.log("Server Running ");
  });
});
