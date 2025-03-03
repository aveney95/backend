const mongoose = require("mongoose")
const ToDo = require("../models/model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

module.exports = {
    gettodos: (req, res) => {
        console.log("Get todos route hit");
        ToDo.find()
          .then((found) => {
            console.log("found", found);
            res.json(found);
          })
          .catch((err) => err);
      },

      create: (req, res) => {
        console.log("create route hit", req.body); //access req.body
        ToDo.create(req.body)
          .then((created) => {
            console.log("created", created);
            res.json("created");
          })
          .catch((err) => err);
      },

      delete: (req, res) => {
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
      },

      edit:  (req, res) => {
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
      },



}