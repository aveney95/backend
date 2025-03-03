const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const ToDoSchema = new Schema({
    todo: String,
    created: Number,
  });

  const ToDo = mongoose.model("ToDo", ToDoSchema); //set ToDo as a variable for mongoose schema
  module.exports = ToDo

  const AuthSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true
        }
        ,
        password: {
            type: String,
            required: true

        },
        created: Number
    }
)
const Auth = mongoose.model('Auth', AuthSchema)

module.exports = Auth