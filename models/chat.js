const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: String,
  msg: String,
  to: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
