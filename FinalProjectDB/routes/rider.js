let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./riders', false);

const testFolder = './riders/';
const fs = require('fs');


function guid1() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

router.post("/", function (req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let classTime = req.body.classTime;

    let guid = guid1();
    kfs(guid, {firstName: firstName,lastName: lastName, age: age, classTime: classTime,guid: guid}, function () {
        res.status(200).send();
    });
});

//get all riders
router.get("/", function (req, res, next) {

 let fileNames=[];
 let promises=[];

 //get all keys (file names)
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            fileNames.push(file);
        });

        //pile up all promises
        fileNames.forEach(function (fileName) {
            promises.push(kfs(fileName));
        });

        //wait for all promises to resolve
        Promise.all(promises).then(function(riders){
            res.send(riders);
        });
    });
});




module.exports = router;
