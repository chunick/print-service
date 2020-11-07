const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');
const multer = require('multer');
const uniqid = require('uniqid');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
   filename: function (req, file, cb) {
      const fileExt = file.originalname.split('.').pop();
      file.filename = uniqid('', `.${fileExt}`);
      cb(null, file.filename)
    }
})
  
var upload = multer({ storage: storage });

router.post('/print', upload.single('fileToPrint'), printController.postPrint);

module.exports = router;