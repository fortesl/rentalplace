const express = require('express');
const router = express.Router();
const CourseDb = require('../data/coursedb');

const courseDb = new CourseDb();
router.get('/', (req, res, next) => {
    courseDb.queryCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});

router.post('/', (req, res, next) => {
    courseDb.createCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});


router.put('/', (req, res, next) => {

});

module.exports = router;