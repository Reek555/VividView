const express = require("express");
const app = express();
const db = require ('./models')
const routes = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config()
var cors = require('cors')
const morgan = require('morgan')
const path = require('path');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('tiny'));

app.use(cors(
  {
    origin: process.env.ORIGIN, 

}))



//app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public')));


//you need to use multer middleware to recieve form data through js formData object


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


const port = process.env.PORT

app.listen(port , () => {
    console.log("express is running on port", port)
    })



