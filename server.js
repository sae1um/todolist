const express = require("express");
const app = express();

const users = [{message: "hello"}];

app.get("/")

app.get("/users", (req, res) => res.json(users[0].message));

app.listen(3005, () => console.log("Server started port 3005"));