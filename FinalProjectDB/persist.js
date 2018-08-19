let express = require('express');
let app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello IM DB!");
});

let riderRouter = require("./routes/rider");
let userRouter = require("./routes/users");
let instructorsRouter = require("./routes/instructors");
let horsesRouter = require("./routes/horses");
let matchesRouter = require("./routes/matches");
let clean = require("./routes/clean");

app.use("/riders", riderRouter);
app.use("/user", userRouter);
app.use("/horses", horsesRouter);
app.use("/instructors", instructorsRouter);
app.use("/matches", matchesRouter);
app.use("/clean", clean);

app.listen(3001);