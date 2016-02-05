var gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass');


gulp.task('sass', function(done) {
    gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css/'))
        //.pipe(minifyCss({
        //    keepSpecialComments: 0
        //}))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});

gulp.task('annotate', function () {
    gulp.src('javascript/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('connect', function() {
    connect.server({
        root: '',
        port: 9000,
        livereload: true
    });
});