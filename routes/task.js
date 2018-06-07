var express = require('express');
var router = express.Router();
var task = require('../models/task');
var jwt = require('../node_modules/jsonwebtoken');
var taskService = require("../services/taskService");

router.post("/add", function (req, res, next) {
    
    let localTask = new task
    ({
        "title" : req.body.name,
        "description" : req.body.description,
        "status" : req.body.status,
        "createdDateTime" : new Date(),
        "lastUpdatedDateTime" : new Date(),
        "totalTime" : 0
    });
    localTask.save(function (err, result) 
    {
        if(err)
        {
         return res.status(500).json({
             "message" : 'An error occurred',
             "data" : err
           });
        }
 
        res.status(201).json({
         "message" : 'Saved Coontact',
         "data" : result
       });
 
    });

});


router.post("/pause", function (req, res, next) {
    let query = {"taskId" : req.body.taskId};
    let diffMs = (new Date().getTime() - new Date(req.body.createdDateTime).getTime());
    diffMs = (diffMs)/(1000 * 60 );
    let localTask = 
    {
        "lastUpdatedDateTime" : new Date(),
        "status" : taskService.getTaskStatus()[0],
        "totalTime" : diffMs + req.body.totalTime
    };

    task.update(query, localTask, function (err, result) 
    {
      if(err)
      {
        console.log(err);
        return res.status(500).json(
          {
            "message":'An error occurred',
            "data": err
          }
        );
      }

      res.status(201).json({
        "message" : 'updated Successfully',
        "data" : result
      });
    });

});


router.post("/start", function (req, res, next) {
    let query = {"taskId" : req.body.taskId};
    let diffMs = (new Date().getTime() - new Date(req.body.createdDateTime).getTime());
    diffMs = (diffMs)/(1000 * 60 * 60);
    let localTask = 
    {
        "lastUpdatedDateTime" : new Date(),
        "status" : taskService.getTaskStatus()[1],
        "totalTime" : diffMs + req.body.totalTime
    };

    task.update(query, localTask, function (err, result) 
    {
      if(err)
      {
        console.log(err);
        return res.status(500).json(
          {
            "message":'An error occurred',
            "data": err
          }
        );
      }

      res.status(201).json({
        "message" : 'updated Successfully',
        "data" : result
      });
    });

});

router.get("/taskStatus", function (req,res, next) {
    
    return res.status(200).json({
        "message" :"",
        "data" : taskService.getTaskStatus()
    });
    
});


router.get("/",function (req, res, next) {
   task.find(function (err,result) {
       if (err) 
       {
           return res.status(500).json(
               {
                   "message" : "An error occurred",
                   "data" : err
               });
       }

       res.status(200).json(
           {
               "message" : "successfull",
               "data" : result
           });
   }); 
});




module.exports = router;