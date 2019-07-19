const docdb = require('documentdb');
const azureStorage = require('azure-storage');


const dbAuth = {
    host: 'https://cdb-rentalplace.documents.azure.com:443/',
    accountKey: process.env.COSMOS_ACCOUNT_KEY
};

const storageAuth = {
    connectionString: process.env.STORAGE_CONNECTION_STRING || 'DefaultEndpointsProtocol=https;AccountName=cs40d03c378490fx4f90xa7b;AccountKey=0NKYzQJ7PEfdNd2WGYr2aov7ocpNEqa4e4Ei2MihY5sMojAf7/X6RERWfmcVNvRZiPpaj2ovGMmqL7BdZWcDnQ==;EndpointSuffix=core.windows.net',
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