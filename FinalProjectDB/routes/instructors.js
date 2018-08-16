let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./instructors', false);
const folder = './instructors/';
const fs = require('fs');

router.get("/:day", function (req, res, next) {
    let dayInTheWeek=req.params.day;
    let instructors=getAllInstructorsByDay(dayInTheWeek,res);

});

router.post("/", function (req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let days = req.body.days;
    let picture = req.body.picture;


    let guid = guid1();
    kfs(guid, {firstName: firstName,lastName: lastName, days: days, email: email,guid: guid, picture:picture}, function () {
        res.status(200).send();
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

function getAllInstructorsByDay(day, res) {

    let fileNames=[];
    let promises=[];
    let filteredRiders=[];
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            fileNames.push(file);
        });

        //pile up all promises
        fileNames.forEach(function (fileName) {
            promises.push(kfs(fileName));
        });

        //wait for all promises to resolve
       return Promise.all(promises).then(function(riders){
           let result = riders.filter(rider => rider.days.includes(day));
            res.send(result);
        });
    });
}

module.exports = router;
