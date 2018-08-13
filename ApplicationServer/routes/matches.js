let express = require("express");
let router = express.Router();
var request = require('request');


//add new matches
router.post("/", function (req,res,next) {
    let horseId = req.body.horseId;
    let riderId = req.body.riderId;
    let instructorId = req.body.instructorId;
    let lessonTime = req.body.lessonTime;
    request.post({
        url: 'http://localhost:3001/matches/',
        json: {horseId: horseId,riderId:riderId, instructorId: instructorId, lessonTime: lessonTime}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(500).send();
        }
        else {
            res.status(200).send({status:200});
        }
    });
});

module.exports = router;
