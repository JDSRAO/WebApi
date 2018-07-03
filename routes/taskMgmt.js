'use strict';
const express = require('express');
const router = express.Router();
const taskMgmtService = require('../services/taskMgmtService');
let Task = require('../models/task');

router.get("/", function (req, res, next) {
    taskMgmtService.getTasks().then(function(data){
        res.status(200).json({'data' : data });
    }, function (err) {
        res.status(500).json({'data' : err});
    });
});

router.post("/add", function (req, res, next) {
    console.log( req.body);
    let localTask = new Task ({
        "title" : req.body.title,
        "description" : req.body.description,
        "status" : req.body.status,
        "createdDateTime" : new Date(),
        "lastUpdatedDateTime" : new Date(),
        "totalTime" : 0,
        "targetDate" : new Date(req.body.targetDate)
    });
    console.log(localTask);

    taskMgmtService.addTask(localTask).then(function(data){
        res.status(200).json({'data' : data });
    }, function (err) {
        res.status(500).json({'data' : err});
    });
});


module.exports = router;