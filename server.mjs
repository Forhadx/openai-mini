import express from "express";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.json({
    msg: "Hello world!",
  });
});

app.listen(5000, () => {
  console.log("server listening on port: 5000");
});
