import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

var knex = require("knex")({
  client: process.env.DB_TYPE,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

// middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/inventory", (req, res) => {
  knex
    .select("*")
    .from("Inventory")
    .then(response => res.json(response))
    .catch(err => res.status(500));
});

app.get("/inventory/:id", (req, res) => {
  const { id } = req.params;

  knex
    .select("*")
    .from("Inventory")
    .where("id", id)
    .then(response => res.json(response))
    .catch(err => res.status(500));
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
