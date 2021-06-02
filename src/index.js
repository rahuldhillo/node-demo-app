const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserModel = require("./dbModel");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/get", (req, res, next) => {
  res.json("The get request recieved");
});

app.post("/post-anything", (req, res, next) => {
  const { name, role } = req.body;
  res.status(200).json(`The entered data is ${name} and ${role}`);
});

app.post("/user-create", async (req, res, next) => {
  const { name, email, password } = req.body;

  const newuser = new UserModel({
    name,
    email,
    password
  });

  try {
    await newuser.save();
  } catch (error) {
    res.send(error.message);
  }

  res.status(200).json({ user: newuser.toObject({ getters: true }) });
});

const DB_CONNECTION_STRING = `mongodb+srv://demo-node-crud:59CkPievhIc1HmsG@cluster0.ranyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(8080, console.log(`Server running`)))
  .catch((err) => console.log(err));
