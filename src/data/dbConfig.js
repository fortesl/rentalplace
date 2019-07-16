const docdb = require('documentdb');
const azureStorage = require('azure-storage');


const dbAuth = {
    host: 'https://cdb-rentalplace.documents.azure.com:443/',
    accountKey: 'eh5uY4j5osHnUMXPWfn0VyVOH2chqVHnM0mcWnkTc8CcHnO60D4cbn8GjQuPaer980ViJOTbkDR6TRw9E8YjsA=='
};

storageAuth = {
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=cs40d03c378490fx4f90xa7b;AccountKey=OQO77+iVRG1qPC3THnCdX5RbjGINoLe7rgRapVpDTG0cSCAEE+VFCax4bkGW5eoMO+1EziqbbhuWYHzGIoJBtg==;',
    imageContainer: 'images'
}

module.exports = {
    client: new docdb.DocumentClient(dbAuth.host, dbAuth.accountKey),
    coursesLink: docdb.UriFactory.createDocumentCollectionUri('rentalplace', 'courses'),
    blobService: azureStorage.createBlobService(storageAuth.connectionString),
    imageContainer: storageAuth.imageContainer,
    imagePermissions: {
        Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.READ,
        Start: azureStorage.date.minutesFromNow(-15),
        Expiry: azureStorage.date.minutesFromNow(30)
    }
};