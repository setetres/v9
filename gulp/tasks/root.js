var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var log = require('../log/log.js');
var notifyError = require('../notify/error.js');

module.exports = function(config, log, error, success) {
    gulp.task('root', function() {
        return gulp.src(config.root.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(gulp.dest(config.root.dest))
            .pipe(browserSync.stream())
            .pipe(plumber.stop());
    });
};
