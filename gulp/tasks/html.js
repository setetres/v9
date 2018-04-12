var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');

var log = require('../log/log.js');
var notifyError = require('../notify/error.js');

module.exports = function(config, log, error, success) {
    gulp.task('html', function() {
        return gulp.src(config.html.src)
            .pipe(pug())
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
            .pipe(gulp.dest(config.html.dest))
            .pipe(browserSync.stream())
            .pipe(plumber.stop());
    });
};
