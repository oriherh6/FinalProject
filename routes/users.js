let express = require("express");
let router = express.Router();
let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./db', false);

router.post("/register", function (req, res, next) {
    let name = req.body.user.name;
    let user = req.body.user.user;
    let password = req.body.user.password;

    user in kfs(function(error, exists) {
        if(exists) {
            res.status(404).send({error: "username already taken"});
        }
        else {
            kfs(user, {todos: [], password: password, name: name}, function () {
                res.status(301).send({url: "http://localhost:3000/static/login.html"});
            });
        }
    });
});


router.post("/login", function (req, res, next) {
    let user = req.body.user.user;
    let password = req.body.user.password;

    kfs(user).then(function(userFromLocal) {
        if (userFromLocal && password === userFromLocal.password) {
            res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
            res.status(301).send({url: "http://localhost:3000/static/ideas.html"});
        }
        else {
            res.status(404).send({error: "user or password are incorrect",url: "http://localhost:3000/static/register-error.html"});
        }
    });
});

module.exports = router;