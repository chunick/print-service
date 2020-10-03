const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
   filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
var upload = multer({ storage: storage });

router.post('/print', upload.single('fileToPrint'), printController.postPrint);

module.exports = router;