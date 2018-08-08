let express = require('express');
let app = express();


// let keyFileStorage = require("key-file-storage");
// // Locate 'db' folder in the current directory as the storage path,
// // Require no latest accessed key-values to be cached:
// let kfs = keyFileStorage('./db', false);

let riderRouter = require("./routes/rider");
let userRouter = require("./routes/users");

app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello IM DB!");
});


app.use("/rider", riderRouter);
app.use("/user", userRouter);

app.listen(3001);