//requiring all the nessassary path's
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const exp = require("constants");

//Connection "views" folder with ejs file
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

//Connecting Mongoose with js file
main()
  .then(() => {
    console.log("Connection Succesful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

//Index Route
app.get("/chats", async (req, res) => {
  let Chats = await Chat.find();
  console.log(Chats);
  res.render("index.ejs", { Chats });
});

app.get("/", (req, res) => {
  console.log("root Working");
  res.send("Hello from root!");
});

//Making Connection With Server
app.listen(8080, () => {
  console.log("Server is Listening on Port 8080");
});
