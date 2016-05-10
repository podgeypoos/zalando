var express = require("express");
var multer = require('multer');
var fs = require('fs');
var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({storage: storage});
var paintFactory = require('./paintFactory');


app.use('/node_modules', express.static(__dirname + '/node_modules'));

var upload = multer({storage: storage});



function processUseCase() {
    var index = 0;
    var array=[];

    matted = createEmptyBatch(numberOfPaintColors);

    numberOfCustomers = array[++index];
    batchs = [];

    for (k = 0; k < numberOfCustomers; k++) {
        batchSize = array[++index];
        s = [];
        for (l = 0; l < batchSize; l++) {
            a = array[++index];
            b = array[++index];
            t = [];
            t.push(parseInt(a - 1));
            t.push(parseInt(b));
            s.push(t);
        }
        batchs.push(s);
    }

    result = paintFactory.processUseCase(numberOfPaintColors,batchs);
    return result;
}

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});

app.post('/uploads', upload.single('file'), function (req, res, next) {

    paintFactory.readFile(req.file.path)
        .then(function(result){
            return files.cleanUpFile(result.toString());
        })
        .then(function(result){
            array=result;
            numberOfTestCases = array[index];
            for (i = 0; i < numberOfTestCases; i++) {
                results.push("use case " + i + ": " + processUseCase());
            }
           return results;
        })
        .then(function(result){
            res.status(200).send(result).end();
        })
});

app.listen(8080, function () {
    console.log("Working on port 8080");
});
