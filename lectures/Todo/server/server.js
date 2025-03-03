const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
const helmet = require('helmet')
app.use(cors())
app.use(express.json())
app.use(helmet())

require('dotenv').config()

const Router = require('./routes/Routes')
Router(app)

const PORT = 3000



app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch(err => console.log(err))
        .catch(err => console.log(err))

    console.log(`Server is runnning on port ${PORT}`)
})