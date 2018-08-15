let express = require("express");
let router = express.Router();
    var request = require('request');


router.post("/register", function (req, res, next) {
    let name = req.body.user.name;
    let user = req.body.user.user;
    let password = req.body.user.password;
    request.post({
        url: 'http://127.0.0.1:3001/user/register',
        json: {name: name, user: user, password: password}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode != 200) {
            res.status(404).send({error: "username already taken"});
        }
        else {
            res.status(301).send({url: "http://127.0.0.1:3000/static/login.html"});
        }
    });

});


router.post("/login", function (req, res, next) {
    let user = req.body.user.user;
    let password = req.body.user.password;

    request.post({
        url: 'http://127.0.0.1:3001/user/login',
        json: {user: user, password: password}
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode===200) {
            res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
            res.status(301).send({url: "http://127.0.0.1:3000/static/welcome.html"});
        }
        else {
            res.status(404).send({
                error: "user or password are incorrect",
                url: "http://127.0.0.1:3000/static/register-error.html"
            });
        }
    });
});

module.exports = router;