let express = require("express");
let router = express.Router();
let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./users', false);

router.post("/register", function (req, res, next) {
    let name = req.body.name;
    let user = req.body.user;
    let password = req.body.password;

    user in kfs(function(error, exists) {
        if(exists) {
            res.status(404).send({error: "username already taken"});
        }
        else {
            kfs(user, {password: password, name: name}, function () {
                res.status(200).send();
            });
        }
    });
});


router.post("/login", function (req, res, next) {
    let user = req.body.user;
    let password = req.body.password;

    kfs(user).then(function (userFromLocal) {
        if (userFromLocal && password === userFromLocal.password) {
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }
    });
});

module.exports = router;