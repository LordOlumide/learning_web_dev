import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  res.send(new URL("../../Frontend/'7.0 CSS Cascade/index.html'"));
});

app.listen(port, () => {
  console.log(`Server App listening on port ${port}`);
});
