const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
router.get('/', function (req, res) {
    // Write code to connect to database and return posts
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            res.render('index', {
                title: "Michael's profile",
                subheading: "A modern Website built in Node with Handlebars",
                posts: posts
            });
        });
    });
});

const getData= (collectionName, query, cb) => {
  const mongoConnection = 'mongodb://localhost:27017/profile';
  MongoClient.connect(mongoConnection, (err, db) => {
    const cursor = db.collection(collectionName).find(query);
    cursor.toArray((error, students) => {
      db.close();
      //res.json(students);
      cb(students)
    });
  });
};

const studentsRoute = function(req, res, name) {
    const route = function(req, res) {
      const cb = function(s) {
        res.json(s);
      }

      // const studentId = req.params.id;
      const query = {};
      getData(name, query, cb)
    };
    return route(req, res);
}
console.log(studentsRoute);

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
