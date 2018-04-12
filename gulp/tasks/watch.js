var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

module.exports = function(config, log, error, success) {
    gulp.task('watch', function() {
        var msg = gutil.colors.black.bgWhite.bold(' SYNC ') + gutil.colors.black.bgWhite(' Use URLs below to access. ');
        console.log(msg);
        browserSync.init({
            server: "./dist",
            port: 7373,
            ui: {
                port: 6669
            }
        });
        gulp.watch(config.fonts.src, ['fonts', reload]);
        gulp.watch(config.html.src, ['html', reload]);
        gulp.watch(config.images.src, ['images', reload]);
        gulp.watch(config.scripts.build.src, ['scripts', reload]);
        gulp.watch(config.styles.build.src, ['styles', reload]);
        gulp.watch(config.root.src, ['root', reload]);
    });
};
