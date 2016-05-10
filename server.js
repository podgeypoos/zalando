var express = require("express");
var multer = require('multer');
var Q = require('q');
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
var index = 0;
var array=[];

function readFile(path) {
    var deferred = Q.defer();
    fs.readFile(path, function (err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    })
    return deferred.promise;
}

function processUseCase() {
    numberOfPaintColors= array[++index];
    numberOfCustomers  = array[++index];

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

    matted = [];

    matted = paintFactory.createEmptyBatch(matted,numberOfPaintColors)

    result = paintFactory.processBatch(numberOfPaintColors,batchs,matted);

    return result;

}

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});

app.post('/uploads', upload.single('file'), function (req, res, next) {

    readFile(req.file.path)
        .then(function(result){
            result= paintFactory.cleanUpFile(result.toString());
            return result;
        })
        .then(function(result){
            array=result;
            var results = [];
            numberOfTestCases = array[index];
            for (i = 0; i < numberOfTestCases; i++) {
                results.push("use case " + i + ": " + processUseCase());
            }

           return results;
        })
        .then(function(result){
            index=0; //reset counter for when new file uploaded
            res.status(200).send(result).end();
        })
});

app.listen(8080, function () {
    console.log("Working on port 8080");
});
