import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "KingBoss",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function getAllUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((row) => {
    users.push({ id: row.id, name: row.name, color: row.color });
  });
  return users;
}

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getAllUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find((user) => user.id == currentUserId).color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    if (result.rows.length === 0) {
      throw Error();
    }

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      return await redirectWithError(
        res,
        "Country has already been added. Try again"
      );
    }
  } catch (err) {
    return await redirectWithError(res, "No country with that name. Try again");
  }
});

async function redirectWithError(res, error) {
  const countries = await checkVisisted();
  const users = await getAllUsers();
  return res.render("index.ejs", {
    error: error,
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find((user) => user.id == currentUserId).color,
  });
}

app.post("/user", async (req, res) => {
  if (req.body["add"] != null) {
    res.render("new.ejs");
  } else {
    currentUserId = req.body["user"];

    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  let newUserName = req.body['name'];
  let newUserColor = req.body['color'];

  try {
    if (newUserName == '') {
      throw Error();
    }
    if (newUserName == '') {
      newUserColor = 'teal';
    }
    let result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id",
      [newUserName, newUserColor]
    );
    currentUserId = result.rows[0]['id'];
    res.redirect('/');
  } catch (e) {
    redirectWithError(res, "Error creating user");    
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
