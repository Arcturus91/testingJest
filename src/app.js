const express = require("express");
const app = express();
const uuid = require("uuid");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.get("/home", (req, res) => {
  res.status(200).send({});
});

app.get("/task", (req, res) => {
  res.status(200).send([]);
});

app.post("/task", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.sendStatus(404);
  res.status(200).send({ id: uuid.v4(), title, description });
});

module.exports = app;
