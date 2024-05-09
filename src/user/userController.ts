import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

// this is the function that helps in registering the user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // database call
    const user = await User.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        "User already exists with this email."
      );
      return next(error);
    }

    // password is hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // token geenration : JWT token
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};

// this is the function that helps login in the user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All fileds are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(
        createHttpError("404", "Username or Password is not correct")
      );
    }

    // create accesstoken
    const token = sign({ sub: user._id }, config.jwtSecret as string);

    res.status(200).json({ accessToken: token });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export { createUser, loginUser };
