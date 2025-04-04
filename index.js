const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then(() => {
    console.log("Connection Succesful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

app.get("/", (req, res) => {
  console.log("root Working");
  res.send("Hello from root!");
});

app.listen(8080, () => {
  console.log("Server is Listening on Port 8080");
});
