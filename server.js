var express = require("express");
var multer = require('multer');
var fs = require('fs');
var app = express();
var Q = require('q');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({storage: storage});

app.use('/node_modules', express.static(__dirname + '/node_modules'));

var upload = multer({storage: storage});

var index = 0;
var array=[];

function cleanUpFile(buffer) {
    var array = buffer.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, '');
    return array;
}
function processEachBatch() {

    numberOfPaintColors = array[++index];
    matted = [];
    for (j = 0; j < numberOfPaintColors; j++) {
        matted.push(0);
    }

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

    var satisfied = false;
    var escape = false;
    var currentCustomerSatisfied = false;

    while (!satisfied && !escape) {
        for (x = 0; x < batchs.length; x++) {
            for (y = 0; y < batchs[x].length; y++) {
                f = batchs[x][y][0];
                p = batchs[x][y][1];
                if (p == matted[f]) {
                    currentCustomerSatisfied = true;
                }
                if (p == 1) {
                    changeToTry = f
                }
            }
            if (!currentCustomerSatisfied) {
                satisfied = true;
                if (changeToTry == -1) {
                    escape = true;
                }
                else {
                    matted[changeToTry] = 1;
                }
            }
        }
        if (!satisfied) {
            return "Impossible";
        }
        else {
            return matted;

        }

    }
}

var readFile = function (path) {
    var deferred = Q.defer();
    fs.readFile(path, function (err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    })
    return deferred.promise;
};

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});

app.post('/uploads', upload.single('file'), function (req, res, next) {

    var results=[];
    index=0;

    readFile(req.file.path)
        .then(function(result){
            return cleanUpFile(result.toString());
        })
        .then(function(result){
            array=result;
            numberOfTestCases = array[index];
            for (i = 0; i < numberOfTestCases; i++) {
                results.push("use case " + i + ": " + processEachBatch());
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
