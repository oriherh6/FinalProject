let express = require("express");
let router = express.Router();
var request = require('request');

router.post("/", function (req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let classTime = req.body.classTime;
    let hasMatch = req.body.hasMatch;
    request.post({
        url: 'http://127.0.0.1:3001/riders/',
        json: {firstName: firstName, lastName: lastName, age: age, classTime: classTime, hasMatch: hasMatch}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(500).send();
        }
        else {
            res.status(200).send({status: 200});
        }
    });
});

router.get("/", function (req, res, next) {
    request.get({
        url: 'http://127.0.0.1:3001/riders/'
    }, function (err, httpResponse, body) {
            res.send(body);
    });
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = router;
