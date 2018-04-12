var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function () {
    var msg = gutil.colors.black.bgWhite.bold(' YAY! ') + gutil.colors.black.bgWhite(' Build finished! ');
    console.log(msg);
};
