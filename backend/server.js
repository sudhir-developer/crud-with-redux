const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

/* Schema + Model */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

/* CREATE */
app.post("/users", async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body); // DEBUG

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* READ */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* UPDATE */
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
});

/* DELETE */
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
