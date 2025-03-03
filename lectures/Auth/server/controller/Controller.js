const mongooose = require('mongoose')
const Auth = require('../models/Models')
const bcrypt = require('bcrypt')


module.exports = {
    register: (req, res) => {
    
        console.log("Reg hit", req.body)
    Auth.findOne({username: req.body.username})
    .then(found => {
        console.log("found",found)
        if(!found){
            console.log("Good username...proceed")
            
            const hash = bcrypt.hashSync(req.body.password, 10)
            console.log("hash", hash)
            const newUser = new Auth (
                {
                username: req.body.username,
                password: hash
            })
    Auth.create(newUser)
    .then(created => {
        console.log("created", created)
    })
    
        } else{
            console.log("Username Already in use")
            res.json({msg: "Username Already In Use"})
        }
    })
    
    
    },

    login: (req, res) => {
        console.log("login", req.body)
        Auth.findOne({username: req.body.username})
        .then(found => {
            console.log("found", found)
            if(bcrypt.compareSync(req.body.password, found.password)) {
                console.log("Good Login")
                res.json({msg: "good login"})
            } else{
                console.log("Bad Login")
            }
          
        })
        .catch(err => console.log(err))
        
    
    
    
    },

    
    
}