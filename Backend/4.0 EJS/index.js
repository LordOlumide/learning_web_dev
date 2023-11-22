import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var day = new Date().getDay();
  res.render(`${__dirname}/views/index.ejs`, { day: day });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
