let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();


let keyFileStorage = require("key-file-storage");
// Locate 'db' folder in the current directory as the storage path,
// Require no latest accessed key-values to be cached:
let kfs = keyFileStorage('./db', false);
app.use(cookieParser());



app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello world!");
});


app.use("/static/ideas.html", authorize);
app.use("/idea", authorize);
//todo add all other end points lie the line above..

function authorize(req, res, next) {
    let user = req.cookies.user;
    if (user == undefined) {
        res.redirect("http://localhost:3000/static/login.html");
        return;
    }
    else{
        next();
    }
}

let todoRouter = require("./routes/todo");
let usersRouter = require("./routes/users");
let riderRouter=require("./routes/riders");
let instructorRouter=require("./routes/instructors");
let horsesRouter=require("./routes/horses");


app.use("/static", express.static('www'));
app.use("/idea", todoRouter);
app.use("/users", usersRouter);
app.use("/riders", riderRouter);
app.use("/instructors", instructorRouter);
app.use("/horses", horsesRouter);


app.listen(3000);