var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var Css = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = uglify('gulp-uglify');
var city = require('./mock/data.json')
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        // .pipe(autoprefixer({
        //     browsers: [last 2 VarDate];
        // }))
        .pipe(Css())
        .pipe(gulp.dest('dast/css'))
})
gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify)
        .pipe(gulp.dest('dast/js'))
})
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dast/html'))
})
gulp.task('watch', function() {
    gulp.src('.src/sass/*.scss', ['sass'])
    gulp.src('src/js/*.js', ['js'])
})
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 6060,
            host: 'localhost',
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = require('url').parse(req.url, true).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
            }
        }))
})
gulp.task('default', ['sass', 'uglify', 'watch'])