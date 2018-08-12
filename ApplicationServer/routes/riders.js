let express = require("express");
let router = express.Router();
var request = require('request');
//get all riders TODO



router.post("/", function (req,res,next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let classTime = req.body.classTime;
    request.post({
        url: 'http://localhost:3001/riders/',
        json: {firstName: firstName,lastName:lastName, age: age, classTime: classTime}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(500).send();
        }
        else {
            res.status(200).send({ok:"bla"});
        }
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
