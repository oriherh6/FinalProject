let express = require("express");
let router = express.Router();
var request = require('request');
//get all horses TODO
router.get("/", function (req, res, next) {
    let user = req.cookies.user;
    kfs(user).then(function (userFromLocal) {
        res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
        res.send(userFromLocal.todos);
    });
});

router.post("/", function (req,res,next) {
    let name = req.body.name;
    let breed = req.body.breed;
    let age = req.body.age;
    let picture = req.body.picture;
    request.post({
        url: 'http://localhost:3001/horses/',
        json: {name: name,breed:breed, age: age, picture: picture}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(500).send();
        }
        else {
            res.status(200).send({ok:200});
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
