import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// app.use(morgan("combined"));
app.use(oluLog);

function oluLog(req, res, next) {
  console.log(`Request method: ${req.method}. Request URL: ${req.url}.`);
  next();
}

app.get("/", (req, res) => {
  res.send("Hello worlddd");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
