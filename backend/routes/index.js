const express = require ('express');
const router = express.Router();
const { isloggedIn } = require('../middleware')
const {isAdmin} = require ('../middleware/isAdmin.js')
const controllers = require('../controllers')   // this whole odd shit can be fixed
const multer  = require('multer')
const path = require('path')
var fs = require('fs');





//you need to use multer middleware to recieve form data through js formData object


router.post ('/register', controllers.registerController)

router.post ('/login', controllers.loginController)

router.get ('/photos', controllers.photosController)

//


router.put ('/edit', isloggedIn, controllers.editController)

router.delete ('/delete', isloggedIn, controllers.deleteController)

router.get('/profile', isloggedIn, controllers.profileController)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage})

router.post('/upload', isloggedIn, upload.single('avatar') , controllers.uploadController)

router.put('/like', isloggedIn, controllers.likeController)

router.put ('/insights', controllers.insightsController)

router.get ('/insights', isloggedIn, isAdmin, controllers.insightsController)








module.exports = router

