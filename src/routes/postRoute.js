const express = require('express');
const authController = require('../controller/AuthController');
const multer = require('multer');
const postController = require('../controller/PostController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpg'
      req.body.img_path = filename;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const router = express.Router();

router.post('/add-post',upload.single('image'), postController.addPost);
router.post('/like-unlike', postController.likeUnLike);
router.get('/get-all-post', postController.getAllPost);


module.exports = router;