const express = require("express");
const app = express();
const db = require ('./models')
const routes = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config()
var cors = require('cors')
const morgan = require('morgan')
const allowCors = require( "./serverlessfunc.js")

const port = process.env.PORT


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('tiny'));


/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://vivid-view.vercel.app"); // Allow all origins (Change "*" to a specific domain if needed)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");

  // Handle Preflight Requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  next();
});
  */


app.use(cors({
    origin: ["https://vivid-view-backend.vercel.app/"], 
    methods: ['GET', "POST"], 
    credentials: true

}))


app.get("/", (req, res) => {
  res.send('the server is running no problem')
})

//app.use('/', routes)


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



