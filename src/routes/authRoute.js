const express = require('express');
const authController = require('../controller/AuthController');
const multer = require('multer');

const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpg'
      req.body.profile_picture = filename;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const router = express.Router();

router.post('/register',upload.single('image'), authController.register);
router.post('/login', authController.login);
router.get('/check-auth',authMiddleware , authController.checkAuth);
module.exports = router;