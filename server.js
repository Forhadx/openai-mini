import "dotenv/config";
import path, { dirname } from "path";

import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
const filePath = path.resolve(dirname("./"), "public");
app.use(express.static(filePath));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/que", async (req, res) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: req.body.msg }],
    model: "gpt-3.5-turbo",
  });

  res.json({
    data: chatCompletion?.choices[0].message?.content,
  });
});

app.listen(5000, () => {
  console.log("server listening on port: 5000");
});
