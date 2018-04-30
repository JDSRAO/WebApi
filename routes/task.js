var express = require('express');
var router = express.Router();
var task = require('../models/task');
var jwt = require('../node_modules/jsonwebtoken');

router.post("/add", function (req, res, next) {
    
    let localTask = new task
    ({
        "title" : req.body.name,
        "description" : req.body.description,
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
    let localTask = new task
    ({
        "title" : req.body.name,
        "description" : req.body.description,
        //"createdDateTime" : new Date(),
        "lastUpdatedDateTime" : new Date(),
        "totalTime" : (new Date() - req.body.createdDateTime)
    });

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