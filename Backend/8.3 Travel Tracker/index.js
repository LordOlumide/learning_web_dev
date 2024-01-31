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

async function checkVisited() {
  const results = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  results.rows.forEach((row) => {
    countries.push(row.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  let countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  let newCountry = req.body.country;
  console.log(newCountry);

  let results = await db.query(
    "SELECT country_Code FROM countries WHERE LOWER(country) LIKE '%' || $1 || '%'",
    [newCountry.toLowerCase()]
  );

  if (results.rows.length === 0) {
    let countries = await checkVisited();
    return res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country does not exist. Please try again",
    });
  }

  try {
    let countryCode = results.rows[0].country_code;
    console.log(countryCode);
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  } catch (error) {
    let countries = await checkVisited();
    return res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country has already been added. Try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
