module.exports = {
    readFile : function (path) {
        var deferred = Q.defer();
        fs.readFile(path, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        })
        return deferred.promise;
    },
    cleanUpFile : function(buffer) {
        var array = buffer.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, '');
        return array;
    },
    processBatch: function(numberOfPaintColors, batchs){

        matted = [];
        for (j = 0; j < numberOfPaintColors; j++) {
            matted.push(0);
        }

        var satisfied = false;
        var getMeOutOfHere = false;
        var currentCustomerSatisfied = false;
        var nextInBatch = null;

        while (!satisfied && !getMeOutOfHere) {
            for (x = 0; x < batchs.length; x++) {
                for (y = 0; y < batchs[x].length; y++) {
                    f = batchs[x][y][0];
                    p = batchs[x][y][1];
                    if (p == matted[f]) {
                        currentCustomerSatisfied = true;
                    }
                    if (p == 1) {
                        nextInBatch = f
                    }
                }
                if (!currentCustomerSatisfied) {
                    satisfied = true;
                    if (nextInBatch == -1) {
                        getMeOutOfHere = true;
                    }
                    else {
                        matted[nextInBatch] = 1;
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
    },
    createEmptyBatch: function(numberOfPaintColors){
        matted = [];
        for (j = 0; j < numberOfPaintColors; j++) {
            matted.push(0);
        }
        return matted;
    }
};
