module.exports = {
    cleanUpFile : function(buffer) {
        var array = buffer.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, '');
        return array;
    }
};
