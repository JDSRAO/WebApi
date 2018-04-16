var express = require('express');
var router = express.Router();
var property = require('../models/property');
var review = require('../models/review');
var authConfig = require('../config/appConfig');
var jwt = require('../node_modules/jsonwebtoken');
var propService = require("../services/propertyService");

router.post("/",function (req, res, next) {
    
    let searchQuery = req.body.searchQuery;
    console.log(searchQuery);
    
    if (searchQuery == "") 
    {
        //console.log("indise if");
        property.find(function (err, result) 
        {
            if (err) 
            {
                res.status(500).json({
                    "message": "Error occurred plaase contact admin",
                    "data" : err
                });   
            }
            else
            {
                res.status(200).json({
                    "message" : "Data successfull",
                    "data" : result
                });
            }
            
        });    
    } 
    else 
    {
        //console.log("indise else");
        //var query = {"name" : req.body.searchQuery}; //"$text" : {"$search" : searchQuery},
        var query = {$or: [{"propertyType": { $regex:new RegExp(searchQuery, "i") }}, {"locality" : new RegExp(searchQuery, "i")}, {"builder":new RegExp(searchQuery, "i")}, {"name" : new RegExp(searchQuery, "i")}] }; //exact search
        property.find(query,function (err, result) 
        {
            if (err) 
            {
                res.status(500).json({
                    "message": "Error occurred plaase contact admin",
                    "data" : err
                });   
            }
            else
            {
                res.status(200).json({
                    "message" : "Data successfull",
                    "data" : result
                });
            }
            
        });    
    }
});

router.put("/getData/:id", function (req, res, next) {
    console.log(req.params);
    let id = req.params.id;
    let query = {"propertyId" : id};
    property.findOne(query,function (err, result) 
        {
            if (err) 
            {
                res.status(500).json({
                    "message": "Error occurred plaase contact admin",
                    "data" : err
                });   
            }
            else
            {
                res.status(200).json({
                    "message" : "Data successfull",
                    "data" : result
                });
            }
            
        });  
});

router.post("/addReview", function (req, res, next) {
    let localreview = new review
    ({
        propertyId : req.body.propertyId,
        title : req.body.title,
        description : req.body.description,
        by : req.body.by,
        createdDateTime : new Date()
    });
    localreview.save(function(err,result) {
        if(err)
        {
          return res.status(500).json({
            "message" : 'An error occurred',
            "data" : err
          });
        }
        res.status(201).json({
          "message" : 'Saved review',
          "data" : result
        });
      });
});


router.put("/getReviews/:id", function (req, res, next) {
    console.log(req.params);
    let id = req.params.id;
    let query = {"propertyId" : id};
    review.find(query,function(err,result) {
        if(err)
        {
          return res.status(500).json({
            "message" : 'An error occurred',
            "data" : err
          });
        }
        res.status(201).json({
          "message" : 'Saved review',
          "data" : result
        });
      }).sort({createdDateTime : -1 });
});

module.exports = router;