import user from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing_user = await user.findOne({ email });
    if (!existing_user)
      return res.status(404).json({ message: "User not found!" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existing_user.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existing_user.email, id: existing_user._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existing_user, token });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existing_user = await user.findOne({ email });
    if (existing_user)
      return res.status(404).json({ message: "User already exists!" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await user.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};
