const Users = require('../models/user')
const Photos = require('../models/photo')
const jsonwebtoken = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path');
require('dotenv').config()



async function registerController (req, res) {
    /* 
        it takes name, email, password and registers a document

        preconditions: 
            all arrguments are given,
            name length >= 4, does not contain white space
            email must be valid form
            password length >= 6

        postconditions: 
            auth taken is returned
            document is created in users collection

    */



    try {

        let {name, email, password} = req.body
        password = await bcrypt.hash (password, 10)

        let user  = new Users ({name, email, password})
        await user.save()


        const token = jsonwebtoken.sign({id: user.id, name, email}, process.env.JWT_SECRET) // creating a token of the provided data
        res.send({msg: 'registered successfully', token: token})
    }
    catch (err) {
        res.status(500).send(err);
    }
}


async function loginController (req, res) {
    const {email, password} = req.body

    let user = await Users.findOne({email})

    if (!user) {
        return res.status(404).send('wrong email or password!')
    }

    const authSuccess = await bcrypt.compare(password, user.password)


    if (!authSuccess) {
        return res.status(404).send('wrong email or password!')
    }
    
    const token = jsonwebtoken.sign({id: user.id, email: user.email, name: user.name}, 'super-secret') // creating a token of the provided data
    res.send({msg: 'logged in successfully', token: token})
    

}

async function profileController (req, res) {
    res.send(req.currentUser)
}


async function uploadController (req, res) {

    /*
        it takes photoName, title, description

        preconditions: 
            all arr are required
            photoName should have jpeg | jpg | png extension
            title length >= 4
            description length >= 4

        postconditions: 
            document is created in photos collection


    */

    try {
        console.log(req.body)
        const {caption} = req.body

        let photo = new Photos({
            fileName: req.file.filename, 
            caption, 
            op: req.currentUser.id})

        await photo.save()

        const photos = await Photos.find({}, {'_id': false})


        res.send({msg: 'uplaoded successfully', photos: photos})
    }
    catch (e) {
        //console.log (e)
        res.status(500).send('Internal server error!')
    }

}

async function photosController(req, res) {
    try {
        const photos = await Photos.find({}, {'_id': false})

        if (req.params.id == 'all') {
                return res.send(photos)
        }

        for (let i of photos) {
            if (i.fileName == req.params.id) {
                return res.sendFile(path.resolve(`uploads/${req.params.id}`))
            }
        }
        
    }
    catch (e) {
        console.log(69, e)
        res.status(500).send('internal server error!')
    }


}

async function editController (req, res) {


    try {
        let photo = await Photos.findOne({fileName: req.body.fileName})

        if (!(photo.op == req.currentUser.id)) {
            return res.end()
        }

        photo.caption = req.body.caption

        await photo.save()

        const photos = await Photos.find({}, {'_id': false})

        res.send({msg: 'Edited successfully!', photos: photos})

    }
    catch (e) {
        console.log (e)
        res.status(500).send('Internal server error!')

    }

    
}

async function deleteController (req, res) {

    try{

        let photo = await Photos.findOne({fileName: req.body.fileName})

        if (!(photo.op == req.currentUser.id)) {
            return res.end()
        }

        await Photos.deleteOne(photo)

        res.send('deleted successfully!')
    }
    catch(e) {
        console.log(66)
        res.status(500).send('Internal server error!')
    }

}

async function likeController (req, res) {

    try {
        let photo = await Photos.findOne({fileName: req.body.fileName})
        photo.likes = req.body.likes
        await photo.save()

        res.send('liked successfully')
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal server error!')
    }
}





module.exports = {
    registerController, 
    loginController, 
    uploadController,
    photosController, 
    editController, 
    deleteController, 
    likeController, 
    profileController}