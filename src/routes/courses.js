const express = require('express');
const router = express.Router();
const db = require('../data/coursedb');

router.get('/', (req, res, next) => {
    db.queryCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});

router.post('/', (req, res, next) => {
    db.createCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});


router.put('/', (req, res, next) => {

});

module.exports = router;