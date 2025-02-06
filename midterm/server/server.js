const express = require("express"); //initiating express
const cors = require("cors"); //initiating cors
const mongoose = require("mongoose"); //initiating mongoose
const app = express(); //set express to variable
app.use(express.json()); // access to req.body
app.use(cors());
require("dotenv").config();

const Schema = mongoose.Schema; //set schema with mongoose
const ToDoSchema = new Schema({
  todo: String,
  created: Number,
});

const ToDo = mongoose.model("ToDo", ToDoSchema); //set ToDo as a variable for mongoose schema

//set routes
//test route
app.get("/test", (req, res) => {
  console.log("test hit");
  res.json({ msg: "hello" });
});

//read route
app.get("/gettodos", (req, res) => {
  console.log("Get todos route hit");
  ToDo.find()
    .then((found) => {
      console.log("found", found);
      res.json(found);
    })
    .catch((err) => err);
});

//create route
app.post("/create", (req, res) => {
  console.log("create route hit", req.body); //access req.body
  ToDo.create(req.body)
    .then((created) => {
      console.log("created", created);
      res.json("created");
    })
    .catch((err) => err);
});

//delete route
app.delete("/delete/:id", (req, res) => {
  console.log("Delete route hit", req.params.id);
  ToDo.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      console.log("deleted", deleted);
      res.json(deleted);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});
//put route
app.put("/edit/:id", (req, res) => {
  console.log("Edit route hit", req.params.id, req.body);
  ToDo.findById(req.params.id)
    .then((edit) => {
      console.log("edit", edit);
      edit.todo = req.body.todo;
      edit
        .save()
        .then((saved) => {
          console.log("saved", saved);
          res.json(saved);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

const PORT = 3000; //Set port
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
  console.log(`Server connected at port ${PORT}`);
});
