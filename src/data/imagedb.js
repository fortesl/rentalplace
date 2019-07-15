const uuid = require('uuid/v1');

const connection = 'DefaultEndpointsProtocol=https;AccountName=cs40d03c378490fx4f90xa7b;AccountKey=OQO77+iVRG1qPC3THnCdX5RbjGINoLe7rgRapVpDTG0cSCAEE+VFCax4bkGW5eoMO+1EziqbbhuWYHzGIoJBtg==;';
const blobService = azureStorage.createBlobService(connection);

const saveImage = (stream, size, callback) => {
    const id = uuid();

    blobService.createBlockBlobFromStream("images", id, stream, size, err => callback(err, id));
};

const getImageUri = (imageId) => {
    const url = blobService.getUrl("images", imageId);
    return url;
};

module.exports = {
    saveImage: saveImage,
    getImageUri: getImageUri
};