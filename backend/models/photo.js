const mongoose = require("mongoose"); 

const PhotoSchema = new mongoose.Schema({
    fileName: {
        type: String, 
        required: true,
        match: /(.png|.jpeg|jpg)/
    }, 
    op: {
        type: String
    },
    caption: {
        type: String, 
        minLength: 4, 
        required: true
    }, 
    likes: [{
        type: String
    }]

})

const Photos = mongoose.model("Photos", PhotoSchema)


module.exports = Photos;