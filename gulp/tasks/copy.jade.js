'use strict';

module.exports = function() {
    $.gulp.task('copy.jade', function() {
        return $.gulp.src('./source/template/**/*.jade', { since: $.gulp.lastRun('copy.jade') })
            .pipe($.gulp.dest($.config.root));
    });
};
