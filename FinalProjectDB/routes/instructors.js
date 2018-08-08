let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./instructors', false);


router.post("/", function (req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let days = req.body.days;

    let guid = guid1();
    kfs(guid, {firstName: firstName,lastName: lastName, days: days, email: email,guid: guid}, function () {
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
