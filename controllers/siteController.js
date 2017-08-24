const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const filePath = __dirname + '/../data/posts.json';
    const callbackFunction = function(error, file) {
        if(error) {
            return next(error);
        }
        // we call .toString() to turn the file buffer to a String
        const fileData = file.toString();
        // we use JSON.parse to get an object out the String
        const postsJson = JSON.parse(fileData);
        // send the json to the Template to render
        res.render('index', {
          title: "Michael's profile",
          subheading: "A modern Website built in Node with Handlebars",
          posts: postsJson
        });
    };
    fs.readFile(filePath, callbackFunction);
});


router.get('/my-cv', function (req, res) {
    res.render('my-cv');
});

router.get('/admin', function (req, res) {
    res.render('admin');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

module.exports = router;