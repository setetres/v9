var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var mmq = require('gulp-merge-media-queries');
var plumber = require('gulp-plumber');
var postCss = require('gulp-postcss');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');

var log = require('../log/log.js');
var notifyError = require('../notify/error.js');

module.exports = function(config, log, error, success) {
    gulp.task('styles:lint', function() {
        return gulp.src(config.styles.lint.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError())
            .pipe(plumber.stop());
    });

    gulp.task('styles:build', function() {
        return gulp.src(config.styles.build.src)
            .pipe(plumber({
                errorHandler: error
            }))
            .pipe(sass({
                includePaths: [],
                noCache: true
            }).on('error', error))
            .pipe(mmq({
                log: true
            }))
            .pipe(postCss([autoprefixer({
                browsers: ['last 2 version']
            })]))
            .pipe(concat('main.min.css'))
            .pipe(cleanCss({
                level: 0
            }))
            .pipe(gulp.dest(config.styles.build.dest))
            .pipe(browserSync.stream())
            .pipe(plumber.stop());
    });

    gulp.task('styles', function(callback) {
        runSequence('styles:lint', 'styles:build', callback);
    });
};
