const mongoose = require("mongoose"); 
require("dotenv").config()


async function main () {
    await mongoose.connect(process.env.DB) 
    
}

main(); 

module.exports = mongoose; 