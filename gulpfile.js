var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
})

gulp.task('assets', function () {
  gulp
    .src('assets/**/*')
    .pipe(gulp.dest('public'));
})

function compile(watch) {
  var bundle = browserify('./index.js', {debug: true});

  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', function () {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle() {
    bundle
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end') })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch-sass', function () {
  return gulp.watch('./index.scss', ['styles']);
});

gulp.task('watch', function () { return compile(true); });

gulp.task('default', ['styles', 'assets', 'build']);
