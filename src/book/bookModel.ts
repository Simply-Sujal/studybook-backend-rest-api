import mongoose from "mongoose";
import { Book } from "./bookType";

const bookSchema = new mongoose.Schema<Book>(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    coverImage: {
      type: String,
      require: true,
    },
    file: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<Book>("Book", bookSchema);

export default Book;
