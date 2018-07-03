'use strict';
let Task = require('../models/task');
const moment = require('moment');

let service = {};

service.getTasks = function () {
  return new Promise(function (resolve, reject) {
    Task.find(function (err, result) {
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

service.startTask = function (taskId) {
  return new Promise(function (resolve, reject) {
    let query = {'taskId' : taskId};
    Task.findOne(query, function (err, data) {
        if (err) {
            reject(err)
        }
        else {
            data.lastUpdatedDateTime = new Date();
            data.status = 'Started';
            data.save(function (err, data) {
               if (err) {   
                reject(err)
               }
               else {   
                resolve(data);
               } 
            });
        }
        
    });
  });
    
};


service.pauseTask = function (taskId) {
    return new Promise(function (resolve, reject) {
      let query = {'taskId' : taskId};
      Task.findOne(query, function (err, data) {
          if (err) {  
            reject(err)
          }
          else {
              let diff = ( new Date().getTime() - new Date(data.lastUpdatedDateTime).getTime() ) / (1000 * 60);
              data.lastUpdatedDateTime = new Date();
              data.status = 'Paused';
              data.time =  diff + data.time;
              data.save(function (err, data) {
                if (err) {   
                    reject(err)
                }
                else {   
                    resolve(data);
                } 
              });
          }
          
      });
    });
      
  };

module.exports = service;