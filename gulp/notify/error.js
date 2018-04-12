var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function(error) {
    var msg = gutil.colors.black.bgWhite.bold(' OPS! ') + gutil.colors.red(error.message.split('\n\nStack Trace:\nundefined')[0]);
    console.log(msg);
};
