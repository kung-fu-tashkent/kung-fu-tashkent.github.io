var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');


gulp.task('sass', function(){
    gulp.src('sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('css/'));
});

gulp.task('default', function() {
    watch('sass/**/*.scss', function() {
		gulp.start('sass');
    });
})