const express = require('express');
const app = express();
const path = require('path');
const printRoutes = require('./routes/print');
const bodyParser= require('body-parser')
const multer = require('multer');
const uniqid = require('uniqid');
const fsExtra = require('fs-extra')
const cron = require('node-cron');

app.use(bodyParser.urlencoded({extended: true}))

// statically serve files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// look for views in views folder
app.set('views', 'views');

// disable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// use the print router
app.use(printRoutes);

// serve index page
app.use((req, res, next) => {
    res.sendFile(__dirname + "/views/index.html");
});

// clear files in uploads folder at 4am every morning
cron.schedule("* * 4 * * *", function() {
  console.log("---------------------");
  console.log("Clearing uploads folder");
  fsExtra.emptyDirSync('./uploads');
});

app.listen(3054);