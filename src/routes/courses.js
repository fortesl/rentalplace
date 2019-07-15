const express = require('express');
const router = express.Router();
const docsdb = require('../data/coursedb');

router.get('/', (req, res, next) => {
    docsdb.queryCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});

router.post('/', (req, res, next) => {
    docsdb.createCourses((err, documents) => {
        if (err) return next(err);
        res.send(documents);
    });
});


router.put('/', (req, res, next) => {

});

module.exports = router;