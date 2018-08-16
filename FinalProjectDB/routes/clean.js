let express = require("express");
let router = express.Router();
const empty = require('empty-folder');

const folder1 = './matches';
const folder2 = './horses';
const folder3 = './instructors';
const folder4 = './riders';


router.get("/", function (req, res, next) {
    empty(folder1, false, (o)=>{
        if(o.error) console.error(err);
        empty(folder2, false, (o)=>{
            if(o.error) console.error(err);
            empty(folder3, false, (o)=>{
                if(o.error) console.error(err);
                empty(folder4, false, (o)=>{
                    if(o.error) console.error(err);
                    res.send({ok:true});
                });
            });
        });
    });
});

module.exports = router;