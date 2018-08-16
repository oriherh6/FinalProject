let express = require("express");
let router = express.Router();
var request = require('request');


router.get("/", function (req, res, next) {
    request.get({
        url: 'http://127.0.0.1:3001/clean/'
    }, function (err, httpResponse, body) {
        res.send(body);
    });
});

module.exports = router;