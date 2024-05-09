import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModel";

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

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
