import express from "express";

const app = express();

const PORT = 3000;

app.use('/', express.static('public'));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.listen(PORT, (err) => {
  console.log(err || `Listening on port ${PORT}`);
});