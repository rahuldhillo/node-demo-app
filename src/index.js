const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/");

app.post("/post-anything", (req, res, next) => {
  const { name, role } = req.body;
  console.log({ name, role });
  res.status(200).json(`The entered data is ${name} and ${role}`);
});

const DB_CONNECTION_STRING = `mongodb+srv://demo-node-crud:59CkPievhIc1HmsG@cluster0.ranyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(8080, console.log(`Server running...`)))
  .catch((err) => console.log(err));
