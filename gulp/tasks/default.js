var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

module.exports = function(config, log, error, success) {
    gulp.task('default', function(callback) {
        runSequence('clean', ['fonts', 'html', 'images', 'scripts', 'styles', 'root'], success);
        callback;
    });
};
