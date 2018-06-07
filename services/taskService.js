'use strict';
var service = {};

service.getTaskStatus = function () {
    let taskStatus = ["New","Active","Close"];
    return taskStatus;  
};

module.exports = service;