import express from "express";

const app = express();

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

export default app;
