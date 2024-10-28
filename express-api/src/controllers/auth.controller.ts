import express, { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomError";
import dotenv from "dotenv";
dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError("Invalid credentials", 400);
    }

    // Verify username and password
    if (username !== ADMIN_USERNAME) {
      throw new CustomError("Invalid credentials", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD);

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 400);
    }

    // Generate and set JWT token
    const token = generateToken({ id: ADMIN_USERNAME });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 7 days
    });

    res
      .status(200)
      .json({ message: "Login successful", userId: ADMIN_USERNAME });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
