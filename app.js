

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs"); 

const app = express();
const port = 4099;

const userFilePath = path.join(__dirname, "users.json");
const likesFile = path.join(__dirname, "likes.json");
const messagesFile = path.join(__dirname, "messages.json");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


if (!fs.existsSync(userFilePath)) fs.writeFileSync(userFilePath, "[]", "utf8");
if (!fs.existsSync(likesFile)) fs.writeFileSync(likesFile, "{}", "utf8");
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, "[]", "utf8");


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
  const { firstName, phone, password, username, lastName = "", dob = "" } = req.body;
  if (!firstName || !phone || !password) return res.status(400).json({ message: "⚠️ Missing required fields" });

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(userFilePath, "utf8"));
  } catch (err) {
    users = [];
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists!" });
  }

  users.push({
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    firstName,
    lastName,
    username,
    dob,
    phone,
    password
  });

  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User Registered Successfully!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(userFilePath, "utf8"));
  } catch {
    users = [];
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.status(200).json({ message: "Login successful!" });
  else res.status(401).json({ message: "Invalid credentials" });
});

app.post("/like", (req, res) => {
  const { postId, username } = req.body;
  if (!postId || !username) return res.status(400).json({ message: "Missing data" });

  let likes = {};
  try {
    likes = JSON.parse(fs.readFileSync(likesFile, "utf8"));
  } catch {
    likes = {};
  }

  if (!likes[postId]) likes[postId] = [];
  if (!likes[postId].includes(username)) likes[postId].push(username);

  fs.writeFileSync(likesFile, JSON.stringify(likes, null, 2));
  res.json({ message: "Post liked", likes: likes[postId].length });
});

app.post("/unlike", (req, res) => {
  const { postId, username } = req.body;
  if (!postId || !username) return res.status(400).json({ message: "Missing data" });

  let likes = {};
  try {
    likes = JSON.parse(fs.readFileSync(likesFile, "utf8"));
  } catch {
    likes = {};
  }

  if (likes[postId]) likes[postId] = likes[postId].filter(u => u !== username);

  fs.writeFileSync(likesFile, JSON.stringify(likes, null, 2));
  res.json({ message: "Post unliked", likes: likes[postId]?.length || 0 });
});


app.get("/messages", (req, res) => {
  let messages = [];
  try {
    const data = fs.readFileSync(messagesFile, "utf8");
    messages = data ? JSON.parse(data) : [];
  } catch {
    messages = [];
  }
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { sender, text, time } = req.body;
  if (!sender || !text || !time) return res.status(400).json({ message: "Missing fields" });

  let messages = [];
  try {
    const data = fs.readFileSync(messagesFile, "utf8");
    messages = data ? JSON.parse(data) : [];
  } catch {
    messages = [];
  }

  messages.push({ sender, text, time });
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  res.json({ message: "Message saved!" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
