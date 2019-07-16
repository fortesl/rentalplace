const uuid = require('uuid/v1');
const dbConfig = require('./dbConfig');

const saveImage = (stream, size, callback) => {
    const id = uuid();

    dbConfig.blobService.createBlockBlobFromStream(dbConfig.imageContainer, id, stream, size, err => 
        callback(err, id));
};

const getImageUri = (imageId) => {
    const url = dbConfig.blobService.getUrl(dbConfig.imageContainer, imageId);
    const sas = dbConfig.blobService.generateSharedAccessSignature(dbConfig.imageContainer, imageId, dbConfig.imagePermissions);
    return `${url}?${sas}`;
};

module.exports = {
    saveImage: saveImage,
    getImageUri: getImageUri
};