const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());

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
router.get('/students', (req, res) => studentsRoute(req, res, 'student'));
// router.get('/students', myData(''));
router.get('/posts',  (req, res) => studentsRoute(req, res, 'posts'));
router.post('/posts',(req, res) => studentsRoute(req, res, 'posts'));
module.exports = router;
