import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets_site",
  password: "KingBoss",
  port: "5432",
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body["username"];
    const password = req.body["password"];

    const checkExists = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkExists.rows.length > 0) {
      // Should be handled
    }

    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      password,
    ]);
    res.redirect("/secrets");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body["username"];
    const password = req.body["password"];

    const results = await db.query(
      "SELECT email, password FROM users WHERE email = $1",
      [email]
    );
    if (results.rows.length == 1) {
      const userObj = results.rows[0];
      if (userObj["password"] == password) {
        res.redirect("/secrets");
      } else {
        throw Error("Password is incorrect");
      }
    } else {
      throw Error("User does not exist");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
});

app.get("/secrets", async (req, res) => {
  res.render("secrets.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
