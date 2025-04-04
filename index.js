//requiring all the nessassary path's
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

//Connection "views" folder with ejs file
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Connecting Mongoose with js file
main()
  .then(() => {
    console.log("Connection Succesful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

//Inserting data in DB
let chat1 = new Chat({
  from: "Sankeerth",
  to: "Rohith",
  msg: "Send me DBMS notes",
  created_at: new Date(), //new Date() creates random date... it is inbuild feature of js
});

chat1.save().then((res) => {
  console.log(res);
});

app.get("/", (req, res) => {
  console.log("root Working");
  res.send("Hello from root!");
});

//Making Connection With Server
app.listen(8080, () => {
  console.log("Server is Listening on Port 8080");
});
