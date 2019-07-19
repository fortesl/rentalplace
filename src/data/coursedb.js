const sampleData = require('./sampleCourses');
const dbConfig = require('./dbConfig');
const TaskDao = require('./taskDao');
const async = require('async');

const databaseId = 'rentalplace';
const collectionId = 'courses';

function CourseDB() {
  this.taskDao = new TaskDao(dbConfig.client, databaseId, collectionId);
  this.taskDao.init();
}

module.exports = CourseDB;

CourseDB.prototype = {

  createCourses: function(callback) {
    const self = this;

    const documents = [];
  
    async.forEachOf(sampleData, (course, key, next) => {
      self.taskDao.addItem(course, (err, document) => {
        if (err) return next(err);
        documents.push(document);
      });
    }, (err) => {
      callback(err, documents)
    });
  
  
    async.forEachO
  },

  queryCourses: function(callback)  {
    const self = this;

    const querySpec = {
      query: 'Select * From c',
      parameters: []
    };
  
    self.taskDao.find(querySpec, (err, results) => {
      callback(err, results);
    });
  
  }

};
