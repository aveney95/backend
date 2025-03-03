const mongoose = require('mongoose')
const ToDo = require('../models/Model')
const bcrypt = require('bcrypt')


module.exports = {
getToDos: (req, res) => {
    console.log("getToDos HIT")
    ToDo.find()
        .then(found => {
            console.log("Found", found)
            res.json(found)
        })
},

create: (req, res) => {
    console.log("Create Route HIT", req.body)
    ToDo.create(req.body)
        .then(created => {
            console.log("created", created)
            res.json(created)
        })
},

delete: (req, res) => {
    console.log("Delete Hit", req.params.id)
    ToDo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("deleted", deleted)
            res.json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
},
test: (req, res) => {
    console.log("Test route hit")
    res.json({ msg: "success" })
},


}