'use strict';
let task = require('../models/task');

let service = {};

service.getTasks = function () {
  return new Promise(function (resolve, reject) {
    task.find(function (err, result) {
        if(err) {
            reject(err);
        }
        else {
            resolve(result);
        }
    }).sort({'createdDateTime' : -1});
  }); 
};

service.addTask = function (task) {
  return new Promise(function (resolve, reject) {
      task.save(function (err, result) {
         if (err) {
            reject(err)
         }
         else {
            resolve(result);
         }
      });
  });
    
};


module.exports = service;