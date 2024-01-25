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

app.get("/", async (req, res) => {
  const results = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  results.rows.forEach((row) => {
    countries.push(row.country_code);
  });
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  let newCountry = req.body.country;
  console.log(newCountry);
  let results = await db.query(
    "SELECT country_Code FROM countries WHERE country = $1",
    [newCountry]
  );

  if (results.rows.length !== 0) {
    let countryCode = results.rows[0].country_code;
    console.log(countryCode);
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
