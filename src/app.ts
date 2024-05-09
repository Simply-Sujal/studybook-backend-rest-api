import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

app.use(globalErrorHandler);

export default app;
