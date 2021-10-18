var gulp = require('gulp');
var csso = require('gulp-csso');
var img = require('gulp-image');
var htmlmin = require('gulp-htmlmin2');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
gulp.task('CompressImg', function() {
    return gulp.src("./src/assets/images/*.+(png|jpg|gif)")
        .pipe(changed("./destination/images"))
        .pipe(img())
        .pipe(gulp.dest("./destination/images"));
})
gulp.task('CSSOpt', function() {
    return gulp.src("./src/style.css")
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(csso())
        .pipe(gulp.dest("./destination/css"))
})
gulp.task('HtmlMin', function() {
    return gulp.src("./src/html/*.html")
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
        }))
        .pipe(gulp.dest("./destination/html"));
})
gulp.task('CopyIndex', function() {
    return gulp.src("./index.js")
    .pipe(gulp.dest("./destination"));
})
gulp.task('default', function(done) {
    var runTasks = gulp.series('CompressImg','CSSOpt','HtmlMin','CopyIndex');
    runTasks();
    done();
})
