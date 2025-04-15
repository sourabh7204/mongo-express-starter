const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connection Succesful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fake-WhatsApp");
}

let allChats = [
  {
    from: "Sankeerth",
    to: "Rohith",
    msg: "Send me DBMS notes",
    created_at: new Date(),
  },
  {
    from: "aditya",
    to: "swati",
    msg: "Can you help me with the presentation?",
    created_at: new Date(),
  },
  {
    from: "raj",
    to: "priya",
    msg: "Did you check the latest update?",
    created_at: new Date(),
  },
  {
    from: "sanya",
    to: "vihaan",
    msg: "Share the project files, please.",
    created_at: new Date(),
  },
  {
    from: "aakash",
    to: "isha",
    msg: "Let’s plan for the weekend outing.",
    created_at: new Date(),
  },
  {
    from: "meera",
    to: "rohan",
    msg: "Can you review my essay?",
    created_at: new Date(),
  },
  {
    from: "manav",
    to: "ananya",
    msg: "Do we have a meeting tomorrow?",
    created_at: new Date(),
  },
  {
    from: "shivani",
    to: "vikram",
    msg: "Kindly approve the budget proposal.",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
