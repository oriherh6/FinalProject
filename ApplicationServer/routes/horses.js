let express = require("express");
let router = express.Router();
var request = require('request');


//get all horses that work on specific day
router.get("/:day", function (req, res, next) {
    let user = req.cookies.user;
    let dayInTheWeek=req.params.day;

    // res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});

    request.get({
        url: 'http://localhost:3001/horses/'+dayInTheWeek},function (err, httpResponse, body) {
        res.send(body);
    });
});

// //get all horses
// router.get("/", function (req, res, next) {
//     let user = req.cookies.user;
//     res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
//     kfs(user).then(function (userFromLocal) {
//         res.send(userFromLocal.todos);
//     });
// });

router.post("/", function (req,res,next) {
    let name = req.body.name;
    let breed = req.body.breed;
    let age = req.body.age;
    let picture = req.body.picture;
    let takenDays=req.body.takenDays;
    request.post({
        url: 'http://localhost:3001/horses/',
        json: {name: name,breed:breed, age: age, picture: picture,takenDays:takenDays}
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
