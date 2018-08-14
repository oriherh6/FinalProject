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
app.use("/static/entity_creation.html", authorize);
app.use("/static/welcome.html", authorize);
app.use("/static/matches_wizard.html", authorize);
app.use("/static/matches.html", authorize);

app.use("/idea", authorize);
//todo add all other end points lie the line above..

function authorize(req, res, next) {
    let user = req.cookies.user;
    if (user == undefined) {
        res.status(401).redirect("http://localhost:3000/static/login.html");
        return;
    }
    else{
        res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});

        next();
    }
}
function authorize_fetch(req, res, next) {
    let user = req.cookies.user;
    if (user == undefined) {
        res.status(401).send({redirect:true, status:401});
        return;
    }
    else{
        res.cookie('user', user, {expire: new Date() + (30 * 60 * 1000)});

        next();
    }
}

let todoRouter = require("./routes/todo");
let usersRouter = require("./routes/users");
let riderRouter=require("./routes/riders");
let instructorRouter=require("./routes/instructors");
let horsesRouter=require("./routes/horses");
let matchesRouter=require("./routes/matches");


app.use("/static", express.static('www'));
app.use("/idea", authorize_fetch);
app.use("/riders", authorize_fetch);
app.use("/instructors", authorize_fetch);
app.use("/horses", authorize_fetch);
app.use("/matches", authorize_fetch);
app.use("/idea", todoRouter);
app.use("/users", usersRouter);
app.use("/riders", riderRouter);
app.use("/instructors", instructorRouter);
app.use("/horses", horsesRouter);
app.use("/matches", matchesRouter);


app.listen(3000);