'use strict';
let Task = require('../models/task');
const moment = require('moment');

let service = {};

service.getTasks = function (isClosed) {
  return new Promise(function (resolve, reject) {
    let query = { 'status' : { $ne : 'Closed'}};
    if(isClosed && isClosed == true) {
        query = { 'status' : { $eq : 'Closed'}};
    }
    Task.find(query, function (err, result) {
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
            reject(err);
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
            reject(err);
        }
        else {
            data.lastUpdatedDateTime = new Date();
            data.status = 'Started';
            data.save(function (err, data) {
               if (err) {   
                reject(err);
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
            reject(err);
          }
          else {
            let diff = ( new Date().getTime() - new Date(data.lastUpdatedDateTime).getTime() ) / (1000 * 60);
            data.lastUpdatedDateTime = new Date();
            data.status = 'Paused';
            data.time =  diff + data.time;
            data.save(function (err, data) {
              if (err) {   
                reject(err);
              }
              else {   
                resolve(data);
              }

            });
          }

      });
    });
      
  };

  service.closeTask = function (taskId) {
      return new Promise(function (resolve, reject) {  
        let query = {'taskId' : taskId};
        let update = { $set : { 'status' : 'Closed' } };
        Task.updateOne(query, update, function (err,data) {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            } 
        });
      });
  };


  service.getTask = function (taskId) {
      return new Promise(function (resolve, reject) {
          let query = {'taskId' : taskId};
          Task.findOne(query, function (err, data) {
            if(err) {  
                reject(err);
            }
            else {  
                resolve(data);
            }
          });
      });
  };

  service.deleteTask = function (taskId) {
    return new Promise(function (resolve, reject) {
        let query = { 'taskId' : taskId};
        Task.deleteOne(query, function (err, data) {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });  
  };

module.exports = service;