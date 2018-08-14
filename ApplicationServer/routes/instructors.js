let express = require("express");
let router = express.Router();
var request = require('request');

//get all instructors that work on specific day
router.get("/:day", function (req, res, next) {
    let user = req.cookies.user;
    let dayInTheWeek=req.params.day;

    // res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});

    request.get({
        url: 'http://localhost:3001/instructors/'+dayInTheWeek},function (err, httpResponse, body) {
        res.send(body);
    });
});

//add new instructor
router.post("/", function (req,res,next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let days = req.body.days;
    request.post({
        url: 'http://localhost:3001/instructors/',
        json: {firstName: firstName,lastName:lastName, email: email, days: days}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(500).send();
        }
        else {
            res.status(200).send({status:200});
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
