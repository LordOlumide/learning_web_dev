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
  database: "permalist_project",
  password: "KingBoss",
  port: 5432,
});
db.connect();

async function getItemsFromDB() {
  let results = await db.query("SELECT * FROM todos");
  let items = [];
  results.rows.forEach((row) => {
    items.push({id: row['id'], title: row["item"]});
  });
  return items;
}

app.get("/", async (req, res) => {
let items = [];
  try {
    items = await getItemsFromDB();
  } catch (error) {
    // fail silently
  }
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  try {
    await db.query("INSERT INTO todos (item) VALUES ($1)", [item]);
  } catch (error) {
    // fail silently
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  try {
    await db.query("UPDATE todos SET item = $1 WHERE id = $2", [item, id]);
  } catch (error) {
    // fail silently
  }
  res.redirect('/');
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
  } catch (error) {
    // fail silently
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
