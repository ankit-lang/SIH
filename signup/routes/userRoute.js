import express from "express";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(404).json({
      success: false,
      message: "Enter valid  detials",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  console.log(req.user);
  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  res.status(201).json({
    success: true,
    user,
    token,
  });
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(404).json({
      success: false,
      message: "Enter valid  detials",
    });
  }

  const user = await userModel.find({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Please SignUp",
    });
  }
  const [users] = user;

  const unhashedPassword = await bcrypt.compare(password, users.password);

  if (!unhashedPassword) {
    res.status(400).json({
      success: false,
      message: "Please Enter the Correct details",
    });
  }

  res.status(201).json({
    success: true,
    user,
  });
});

export default router;
