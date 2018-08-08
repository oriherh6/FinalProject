let express = require("express");
let router = express.Router();

let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./db', false);

router.get("/:user", function (req, res, next) {
    let user = req.params.user;
    console.log(user);
    kfs(user).then(function (userFromLocal) {
        res.send(userFromLocal);
    });
});

router.post("/:id", function (req, res, next) {
    let user = req.cookies.user;
    kfs(user).then(function (userFromLocal) {
        let todos = userFromLocal.todos;
        let id = req.params.id;
        objIndex = todos.findIndex((obj => obj.id == id));
        todos[objIndex].content = req.body.todo.content;
        todos[objIndex].done = req.body.todo.done;
        userFromLocal.todos = todos;
        kfs(user, userFromLocal, function () {
            res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
            res.end(JSON.stringify(todos[objIndex]));
        });
    });
});

router.put("/", function (req, res, next) {
    let user = req.cookies.user;
    kfs(user).then(function (userFromLocal) {
        let todos = userFromLocal.todos;
        let todo = req.body.todo;
        todo.id = guid();
        todos.push(todo);
        userFromLocal.todos = todos;
        kfs(user, userFromLocal, function () {
            res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
            res.end(JSON.stringify({id: todo.id}));
        });
    });
});

router.delete("/:id", function (req, res, next) {
    let user = req.cookies.user;
    kfs(user).then(function (userFromLocal) {
        let todos = userFromLocal.todos;

        let id = req.params.id;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
                userFromLocal.todos = todos;
                kfs(user, userFromLocal, function () {
                    res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
                    res.end("0");
                    res.send();
                });
            }
            else {
                res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});
                res.end("1");
                res.send();
            }
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
