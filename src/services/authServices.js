import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();

//@desc - signup User
//@route - mutation { signUp(name, email, password) { email } }
export const createUser = async (_, { name, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`${email} exist`);
      throw new AppError(`${email} already exist`);
    }

    const user = new User({ name, email, password });
    await user.save();

    return { id: user._id.toString(), name: user.name, email: user.email };
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message);
  }
};

//@desc - login User
//@route - mutation { loginUser(email, password) {token} }
export const loginUser = async (_, { email, password }, { res }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`user ${email} not found`);
      throw new AppError("invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("incorrect password");
      throw new AppError("invalid credentials");
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" });
    res.cookie("urlShortenerToken", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 3600 * 1000,
    });

    console.log(`user ${user.name} logged in`);
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      token,
    };
  } catch (error) {
    console.log(`login error: ${error.message}`);
    throw new AppError(error.message);
  }
};

//@desc - logout user
//@route - mutation { logoutUser() }
export const logoutUser = (_, __, { res }) => {
  res.clearCookie("urlShortenerToken");
  return { message: "user Logged out" };
};

//@desc - get Users
//@route - query { getUsers() }
export const getUser = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) throw new Error("omo nothing dey o!");

    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    }));
  } catch (error) {
    console.log(`get users error - ${error.message}`);
    throw new AppError(error.message);
  }
};
