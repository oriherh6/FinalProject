let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();


let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./db', false);
app.use(cookieParser());


let todoRouter = require("./routes/todo");
let usersRouter = require("./routes/users");

app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello world!");
});


app.use("/static/ideas.html", authorize);
app.use("/idea", authorize);

function authorize(req, res, next) {
    let user = req.cookies.user;
    if (user == undefined) {
        res.redirect("http://localhost:3000/static/login.html");
        return;
    }
    user in kfs(function(error, exists) {
        if(exists) {
            next();
        }else{
            res.redirect("http://localhost:3000/static/login.html");

        }
    });
}

app.use("/static", express.static('www'));
app.use("/idea", todoRouter);
app.use("/users", usersRouter);

app.listen(3000);