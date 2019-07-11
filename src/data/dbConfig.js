const docdb = require('documentdb');


const auth = {
    host: 'https://cdb-rentalplace.documents.azure.com:443/',
    accountKey: 'eh5uY4j5osHnUMXPWfn0VyVOH2chqVHnM0mcWnkTc8CcHnO60D4cbn8GjQuPaer980ViJOTbkDR6TRw9E8YjsA=='
};

module.exports = {
    client: new docdb.DocumentClient(auth.host, auth.accountKey),
    coursesLink: docdb.UriFactory.createDocumentCollectionUri('rentalplace', 'courses')
};