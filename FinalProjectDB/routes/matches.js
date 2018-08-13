let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfsMatches = keyFileStorage('./matches', false);
let kfsRider = keyFileStorage('./riders', false);
let kfsHorse = keyFileStorage('./horses', false);
let kfsInstructor = keyFileStorage('./instructors', false);

const folder = './matches/';
const fs = require('fs');

router.post("/", function (req, res, next) {
    let horseId = req.body.horseId;
    let riderId = req.body.riderId;
    let instructorId = req.body.instructorId;
    let lessonTime = req.body.lessonTime;

    //update horse taken day because of the new match
    kfsHorse(horseId).then(function (horse) {
        horse.takenDays.push(lessonTime);
        kfsHorse(horseId, horse);
    });

    // update rider to hasMatch=true
    kfsRider(riderId).then(function (rider) {
        rider.hasMatch = true;
        kfsRider(riderId, rider)
    });

    //add new match file
    let guid = guid1();
    kfsMatches(guid, {
        horseId: horseId,
        riderId: riderId,
        instructorId: instructorId,
        lessonTime: lessonTime,
        guid: guid
    }, function () {
        res.status(200).send();
    });
});

function richMatchesByGuids(matches, f) {
    let promises = [];

    matches.forEach(function (match) {
        promises.push(kfsRider(match.riderId));
        promises.push(kfsHorse(match.horseId));
        promises.push(kfsInstructor(match.instructorId));
    });

    Promise.all(promises).then(function (allObjects) {
        let richMatches = [];
        matches.forEach(function (match) {
            let richObj = new Object();

            //find rider
            richObj.rider = allObjects.find(function (obj) {
                return obj.guid === match.riderId;
            });

            //find horse
            richObj.horse = allObjects.find(function (obj) {
                return obj.guid === match.horseId;
            });

            //find instructor
            richObj.instructor = allObjects.find(function (obj) {
                return obj.guid === match.instructorId;
            });
            richObj.lessonTime = match.lessonTime;
            richObj.guid = match.guid;
            richMatches.push(richObj);
        });
        f(richMatches);
    });
}

//get all matches
router.get("/", function (req, res, next) {

    let fileNames = [];
    let promises = [];

    //get all keys (file names)
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            fileNames.push(file);
        });

        //pile up all promises
        fileNames.forEach(function (fileName) {
            promises.push(kfsMatches(fileName));
        });
        //wait for all promises to resolve
        Promise.all(promises).then(function (matches) {
            richMatchesByGuids(matches, function (richMatches) {
                res.send(richMatches);
            });
        });
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