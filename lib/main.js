var loaderUtils = require('loader-utils')
var Px2rem = require('px2rem')
var jsdatatype = require("js-data-type");

module.exports = function (source) {
    var options = loaderUtils.getOptions(this) || null;
    if (!options) {
        options = this.query;
    }
    if (jsdatatype(options) == "String") {
        var str = options.substr(options.indexOf("?"));
        var arr = str.split("&"), ret = {};
        arr.forEach(function (item) {
            var a = item.split("=");
            ret[a[0]] = a[1];
        })
        options = ret;
    }
    //var query = loaderUtils.parseQuery();
    console.log(options);
    var px2remIns = new Px2rem(options)
    return px2remIns.generateRem(source)
}
