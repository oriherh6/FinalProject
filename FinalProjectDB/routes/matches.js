let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfsMatches = keyFileStorage('./matches', false);
let kfsRider = keyFileStorage('./riders', false);
// const folder = './matches/';
// const fs = require('fs');

router.post("/", function (req, res, next) {
    let horseId = req.body.horseId;
    let riderId = req.body.riderId;
    let instructorId = req.body.instructorId;
    let lessonTime = req.body.lessonTime;

    kfsRider(riderId).then(function (rider) {
       rider.hasMatch=true;
       kfsRider(riderId,rider).then(function(){
           let guid = guid1();
           kfsMatches(guid, {horseId: horseId,riderId: riderId, instructorId: instructorId, lessonTime: lessonTime,guid: guid}, function () {
               res.status(200).send();
           });
       })
    });


});


function guid1() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


module.exports = router;