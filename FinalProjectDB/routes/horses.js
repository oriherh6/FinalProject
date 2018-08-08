let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./horses', false);


router.post("/", function (req, res, next) {
    let name = req.body.name;
    let breed = req.body.breed;
    let age = req.body.age;
    let picture = req.body.picture;

    let guid = guid1();
    kfs(guid, {name: name,breed: breed, age: age, picture: picture,guid: guid}, function () {
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

module.exports = router;
