import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1>Hello world</h1><p>Long Strings make the world a better place</p>"
  );
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/olumide", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/olumide", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/olumide", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server App listening on port ${port}`);
});
