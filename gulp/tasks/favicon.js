'use strict';

module.exports = function() {
    $.gulp.task('favicon', function() {
        return $.gulp.src('./source/images/**/*.ico', { since: $.gulp.lastRun('favicon') })
            .pipe($.gulp.dest($.config.root));
    });
};