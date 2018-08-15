let express = require('express');
let app = express();


// let keyFileStorage = require("key-file-storage");
// // Locate 'db' folder in the current directory as the storage path,
// // Require no latest accessed key-values to be cached:
// let kfs = keyFileStorage('./db', false);


app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello IM DB!");
});

let riderRouter = require("./routes/rider");
let userRouter = require("./routes/users");
let instructorsRouter = require("./routes/instructors");
let horsesRouter = require("./routes/horses");
let matchesRouter = require("./routes/matches");

app.use("/riders", riderRouter);
app.use("/user", userRouter);
app.use("/horses", horsesRouter);
app.use("/instructors", instructorsRouter);
app.use("/matches", matchesRouter);

app.listen(3001);