let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./horses', false);
const folder = './horses/';
const fs = require('fs')

router.get("/:day", function (req, res, next) {
    let dayInTheWeek = req.params.day;

    let horses = getAllHorsesByDay(dayInTheWeek, res);

});

router.post("/", function (req, res, next) {
    let name = req.body.name;
    let breed = req.body.breed;
    let age = req.body.age;
    let picture = req.body.picture;
    let takenDays = req.body.takenDays;

    let guid = guid1();
    kfs(guid, {name: name, breed: breed, age: age, picture: picture, guid: guid, takenDays: takenDays}, function () {
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

function getAllHorsesByDay(date, res) {
    let fileNames = [];
    let promises = [];
    let filteredHorses = [];
    qdate = new Date(date);
    let day = qdate.getDate();
    let year = qdate.getFullYear();
    let month = qdate.getMonth();

    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            fileNames.push(file);
        });

        //pile up all promises
        fileNames.forEach(function (fileName) {
            promises.push(kfs(fileName));
        });

        //wait for all promises to resolve
        return Promise.all(promises).then(function (horses) {
            // return all horses that day is not(!) in their taken days array
            let result = horses.filter(function (horse) {
                let horseDate = new Date(horse.takenDays);
                if (horseDate.getFullYear() == year && horseDate.getDate() == day && horseDate.getMonth() == month) {
                    return false;
                }
                else {
                    return true;
                }
            });
            res.send(result);
        });
    });
}

module.exports = router;
