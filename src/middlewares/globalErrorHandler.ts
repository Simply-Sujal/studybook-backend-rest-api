import { config } from "../config/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    msg: err.message,
    errorStack: config.env === "development" ? err.stack : "",
  });
};
