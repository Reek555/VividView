const express = require ('express');
const router = express.Router();
const { isloggedIn } = require('../middleware')
const {isAdmin} = require ('../middleware/isAdmin.js')
const controllers = require('../controllers')   // this whole odd shit can be fixed
const multer  = require('multer')
var fs = require('fs');




router.get('/', (req, res) => {


  fs.readFile('./insights.json', 'utf8', function(err, data) {
    
    if (err) {
      res.status(500).send("internal server error!")
    }

    let doc = JSON.parse(data)
    doc["ips"].push(req.ip)
    doc = JSON.stringify(doc)
    fs.writeFile('insights.json', doc, function (err) {})

  }) 

  res.send('you made connection to the server')
  //res.sendFile('/home/reek/Desktop/app-g2/backend/views/index.html');

})


//you need to use multer middleware to recieve form data through js formData object

router.post ('/register', controllers.registerController)

router.post ('/login', controllers.loginController)

router.get ('/photos/:id', controllers.photosController)

//


router.put ('/edit', isloggedIn, controllers.editController)

router.delete ('/delete', isloggedIn, controllers.deleteController)

router.get('/profile', isloggedIn, controllers.profileController)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage})

router.post('/upload', isloggedIn, upload.single('avatar') , controllers.uploadController)

router.put('/like', isloggedIn, controllers.likeController)

router.get ('/insights', isloggedIn, isAdmin, controllers.insightsController)








module.exports = router

