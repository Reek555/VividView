const mongoose = require("mongoose"); 
//require("dotenv").config()


//mongoose.connect("mongodb+srv://rickswass:9bpClcBDMyAqHbVp@cluster0.1zeidif.mongodb.net/test")
//mongoose.connect(process.env.LOCAL_DB);
//'mongodb://127.0.0.1:27017/appG2'

async function main () {
    await mongoose.connect("mongodb+srv://rickswass:9bpClcBDMyAqHbVp@cluster0.1zeidif.mongodb.net/vividViewDB");
}

main(); 

module.exports = mongoose; 