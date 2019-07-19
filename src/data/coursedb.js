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
    let i = 0;
    sampleData.forEach(course => {
      self.taskDao.addItem(course, (err, doc) => {
        if (err) {
          callback(err);
          return;
        } else {
          documents.push(doc);
          i++;
          if (i == sampleData.length) {
            callback(null, documents);
            return;
          }
        } 
      });
    });
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
