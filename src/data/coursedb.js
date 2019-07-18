const sampleData = require('./sampleCourses');
const dbConfig = require('./dbConfig');
const async = require('async');

const createCourses = (callback) => {
  const documents = [];

  async.forEachOf(sampleData, (course, key, next) => {
    dbConfig.client.createDocument(dbConfig.coursesLink, course, (err, document) => {
      if (err) return next(err);
      documents.push(document);
    });
  }, (err) => callback(err, documents));

};

const queryCourses = (callback) => {
  const querySpec = {
    query: 'Select * From c',
    parameters: [],
  };

  dbConfig.client.queryDocuments(dbConfig.coursesLink, querySpec).toArray((err, results) => {
    if (err) return next(err);
    if (results.length == 0) {
      createCourses((err, documents) => {
        if (err) return next(err);
        callback(err, documents);
      });
    }
    else {
      callback(err, results);
    }
  });

};

module.exports = {
  createCourses: createCourses,
  queryCourses: queryCourses,
};
