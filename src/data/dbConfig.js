const docdb = require('documentdb');
const azureStorage = require('azure-storage');


const dbAuth = {
    host: 'https://cdb-rentalplace.documents.azure.com:443/',
    accountKey: 'eh5uY4j5osHnUMXPWfn0VyVOH2chqVHnM0mcWnkTc8CcHnO60D4cbn8GjQuPaer980ViJOTbkDR6TRw9E8YjsA=='
};

module.exports = {
    client: new docdb.DocumentClient(dbAuth.host, dbAuth.accountKey),
    coursesLink: docdb.UriFactory.createDocumentCollectionUri('rentalplace', 'courses')
};