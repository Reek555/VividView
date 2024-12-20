const mongoose = require("mongoose"); 


function isEmail(s) {
    let a = s.split('@')
    
    const c1 = a.length == 2
    const c2 = !a.includes('')
    
    if (!(c1 && c2)) {
      return false
    }
    
    let b = a[1].split('.')
    
    const c3 = b.length == 2
    const c4 = !b.includes('')
    
    if (!(c3 && c4)) {
      return false
    }

    return true
}


const PhotoSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        validate: {
            validator: (arr) => isEmail(arr), 
            message: 'Invalid Email!'
        }
    },
    name: {
        type: String, 
        required: true,
        match: [/\S/, "name can't contain white space"], 
        minLength: [4 , 'name is too short']
    }, 

    password: {
        type: String,
        required: true,
        minLength: [6, 'password is too short']
    }

})

const Users = mongoose.model("users", PhotoSchema)


module.exports = Users;