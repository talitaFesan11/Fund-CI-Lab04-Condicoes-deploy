/* eslint-env node */
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bem vindos ao WebAcademy Turma 05!!");
});

app.listen(8080, () => {
  console.log("Rodando na porta 8080");
});
