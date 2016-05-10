module.exports = {
    cleanUpFile: function (buffer) {
        var array = buffer.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, '');
        return array;
    },
    processBatch: function (numberOfPaintColors, batchs, matted) {

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
    createEmptyBatch: function (matted,numberOfPaintColors) {
        for (j = 0; j < numberOfPaintColors; j++) {
            matted.push(0);
        }
        return matted
    }
};
