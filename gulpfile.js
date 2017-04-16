/*
|--------------------------------------------------------------------------
| Gulpfile
|--------------------------------------------------------------------------
|
| buildfile for jquery.formulary plugin
|
*/

var gulp              = require('gulp');
var concat            = require('gulp-concat');
var uglify            = require('gulp-uglify');
var rename            = require("gulp-rename");
var addsrc            = require('gulp-add-src');
var beautify          = require('gulp-beautify');
var removeEmptyLines  = require('gulp-remove-empty-lines');
var strip             = require('gulp-strip-comments');

/*
|--------------------------------------------------------------------------
| Default
|--------------------------------------------------------------------------
*/

gulp.task('js:default', function() {
  gulp.src(['./resources/plugin/js/main.js'])
    .pipe(concat('dist/jquery.equaizer.js'))
    .pipe(beautify({indent_size: 2}))
    .pipe(strip())
    .pipe(removeEmptyLines({ removeComments: true }))
    .pipe(gulp.dest('.'));
});

/*
|--------------------------------------------------------------------------
| Minify
|--------------------------------------------------------------------------
*/

gulp.task('js:minify', function() {
  gulp.src(['./resources/plugin/js/main.js'])
    .pipe(concat('dist/jquery.equaizer.js'))
    .pipe(uglify({ preserveComments: true }))
    .pipe(rename({ suffix : '.min' }))
    .pipe(gulp.dest('.'));
});

/*
|--------------------------------------------------------------------------
| Build
|--------------------------------------------------------------------------
*/

gulp.task('build',['js:default', 'js:minify']);

/*
|--------------------------------------------------------------------------
| Watch
|--------------------------------------------------------------------------
*/

gulp.task('watch', function () {
  gulp.watch('./resources/plugin/js/main.js', ['js:default']);
});