const express = require("express");
const app = express();
const db = require ('./models')
const routes = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config()
var cors = require('cors')
const morgan = require('morgan')


const port = process.env.PORT


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'));


app.use('/', routes)


//if the end point does't exist
app.use((req, res, next) => {
    res.status(404).send('no such page!')
})


//if an error raised anywhere in the application
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something broke!')
  })


app.listen(port, () => {
    console.log("express is running on port 3000")
    })


