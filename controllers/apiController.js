const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json());

router.get('/posts', (req, res, next) => {
    const filePath = __dirname + '/../data/posts.json';
    const callbackFunction = function(error, file) {
        if(error) {
            return next(error);
        }
        // we call .toString() to turn the file buffer to a String
        const fileData = file.toString();
        // we use JSON.parse to get an object out the String
        const postsJson = JSON.parse(fileData);
        res.json(postsJson);
    };
    fs.readFile(filePath, callbackFunction);
});

router.post('/posts', (req, res) => {
    console.log(req.body);
    res.status(500).send('not implemented');
});

module.exports = router;