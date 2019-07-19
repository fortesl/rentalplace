const docdb = require('documentdb');
const azureStorage = require('azure-storage');


const dbAuth = {
    host: 'https://cdb-rentalplace.documents.azure.com:443/',
    accountKey: process.env.COSMOS_ACCOUNT_KEY
};

const storageAuth = {
    connectionString: process.env.STORAGE_CONNECTION_STRING,
    imageContainer: 'images'
};

module.exports = {
    client: new docdb.DocumentClient(dbAuth.host, {
        masterKey: dbAuth.accountKey
    }),
    blobService: azureStorage.createBlobService(storageAuth.connectionString),
    imageContainer: storageAuth.imageContainer,
    imagePermissions: {
        AccessPolicy: {
            Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.READ,
            Start: azureStorage.date.minutesFromNow(-15),
            Expiry: azureStorage.date.minutesFromNow(30)    
        }
    }
};