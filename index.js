const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
  console.log("MongoDB connected");
}
main().catch((err) => console.log(err));

// Routes

// Home
app.get("/", (req, res) => {
  res.send("Welcome to Mini WhatsApp!");
});

// Show all chats
app.get("/chats", async (req, res) => {
  const Chats = await Chat.find();
  res.render("index", { Chats });
});

// New chat form
app.get("/chats/new", (req, res) => {
  res.render("new");
});

// Create new chat
app.post("/chats/new", async (req, res) => {
  const { from, msg, to } = req.body;

  const newChat = new Chat({
    from,
    msg,
    to,
    created_at: new Date(),
  });

  await newChat.save(); // Save to MongoDB
  res.redirect("/chats");
});

//Chat Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { msg: newMsg } = req.params;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    {
      runValidators: true,
      new: true,
    }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Start server
app.listen(8080, () => {
  console.log(" Server running on http://localhost:8080");
});
