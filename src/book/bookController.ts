import { NextFunction, Request, Response } from "express";
import Book from "./bookModel";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Files", req.files);

    // this is telling the type of the file
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // application/pdf
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const fileName = files.coverImage[0].filename;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: "book-covers",
        format: coverImageMimeType,
      });

      const bookFileName = files.file[0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFileName
      );

      const bookFileUploadResult = await cloudinary.uploader.upload(
        bookFilePath,
        {
          resource_type: "raw",
          filename_override: bookFileName,
          folder: "book-pdfs",
          foramt: "pdf",
        }
      );
      console.log(bookFileUploadResult);
      console.log("upload result", uploadResult);
    } catch (error) {
      console.log(error);
      return next(createHttpError(500, "Error while uploading the files."));
    }

    res.json({});
  } catch (error) {}
};

export { createBook };
