const express = require ('express');
const router = express.Router();
const { isloggedIn } = require('../middleware')
const {isAdmin} = require ('../middleware/isAdmin.js')
const controllers = require('../controllers')   // this whole odd shit can be fixed
const multer  = require('multer')
const path = require('path')
var fs = require('fs');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary')



//you need to use multer middleware to recieve form data through js formData object



router.get('/home', async (req, res) => {
    //console.log(__dirname) //routes
    //console.log(process.cwd()) //backend

    res.send ('welcom to home page.')
    
})


router.post ('/register', controllers.registerController)

router.post ('/login', controllers.loginController)

router.get ('/photos', controllers.photosController)

//


router.put ('/edit', isloggedIn, controllers.editController)

router.delete ('/delete', isloggedIn, controllers.deleteController)

router.get('/profile', isloggedIn, controllers.profileController)


cloudinary.v2.config({ 
  cloud_name: 'dbffpmya5', 
  api_key: '349899937571167', 
  api_secret: 'EhTx3Kf_bP0cMtGKepUcZVjHdKA' // Click 'View API Keys' above to copy your API secret
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    allowed_formats: ["jpg", "png", "jpeg"]  // Allowed file formats
  }
});


const upload = multer({ 
                    storage: storage,
                    limits: { fileSize: 2 * 1024 * 1024 }});


router.post('/upload', isloggedIn, upload.single('avatar') , controllers.uploadController)

router.put('/like', isloggedIn, controllers.likeController)

router.put ('/insights', controllers.insightsController)

router.get ('/insights', isloggedIn, isAdmin, controllers.insightsController)








module.exports = router

