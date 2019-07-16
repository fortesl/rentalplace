const express = require('express');
const router = express.Router();
const imagedb = require('../data/imagedb');
const multiparty = require('multiparty');

router.get('/', (req, res, next) => {
    res.render('images');
});

router.post('/', (req, res, next) => {
    const form = new multiparty.Form();

    form.on('part', part => {
        imagedb.saveImage(part, part.byteCount, (err, id) => {
            if (err) next(err);
            res.redirect(`/images/show/${id}`);
        });
    });

    form.parse(req);

});

router.get('/show/:imageId', (req, res, next) => {
    const url = imagedb.getImageUri(req.params.imageId);
    res.render('showimage', { imageSrc: url });
});

module.exports = router;