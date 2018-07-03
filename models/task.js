var moongoose = require('../config/mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var Task = new Schema
({
    taskId : Number,
    title : String,
    description : String,
    status : { type : String, default : 'Paused'},
    createdDateTime : {type : Date, default : Date.now},
    lastUpdatedDateTime : Date,
    time : { type : Number, default : 0}, 
    targetDate : Date
});

Task.plugin(autoIncrement.plugin, {model : 'Task', field : 'taskId', startAt : 1});

module.exports = moongoose.model('Task', Task);