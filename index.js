// Requiring all the necessary packages and paths
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Setting up view engine and static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connecting Mongoose
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
  console.log("Connection Successful!");
}
main().catch((err) => console.log(err));

// Routes

// Home route
app.get("/", (req, res) => {
  console.log("Root route working");
  res.send("Hello from root!");
});

// Show all chats
app.get("/chats", async (req, res) => {
  const Chats = await Chat.find();
  res.render("index.ejs", { Chats });
});

// Show form to create a new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Handle form submission (POST route)
app.post("/chats/new", async (req, res) => {
  const { from, to, msg } = req.body;
  const newChat = new Chat({ from, to, msg });
  await newChat.save();
  res.redirect("/chats");
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
