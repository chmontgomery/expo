var gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  karma = require('gulp-karma'),
  runSequence = require('run-sequence'),
  livereload = require('gulp-livereload');

var paths = {
  scripts: './src/client/js/**/*.js',
  partials: './src/client/partials/**/*.html',
  less: './src/client/less/**/*.less',
  tests: './test/client/js/**/*.js',
  test_helpers: './bower_components/angular-mocks/angular-mocks.js',
  dist: './dist/**/*.js'
};

var bowerFiles = [
  './bower_components/angular/angular.js',
  './bower_components/angular-ui/build/angular-ui.js',
  './bower_components/angular-ui/build/angular-ui.css',
  './bower_components/jquery/dist/jquery.js',
  './bower_components/bootstrap/dist/css/bootstrap.css',
  './bower_components/bootstrap/dist/css/bootstrap-theme.css',
  './bower_components/bootstrap/dist/js/bootstrap.js',
  './bower_components/lodash/dist/lodash.js',
  './bower_components/moment/moment.js'
];

var bowerFilesMin = [
  './bower_components/angular/angular.min.js',
  './bower_components/angular-ui/build/angular-ui.min.js',
  './bower_components/angular-ui/build/angular-ui.min.css',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/bootstrap/dist/js/bootstrap.min.js',
  './bower_components/bootstrap/dist/css/bootstrap.min.css',
  './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
  './bower_components/lodash/dist/lodash.min.js',
  './bower_components/moment/moment/min/moment.min.js'
];

gulp.task('clean', function () {
  return gulp.src(['./dist/*'], {read: false})
    .pipe(clean());
});

gulp.task('bowerFiles', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  return gulp.src(bowerFiles, { base: './bower_components/' })
    .pipe(gulp.dest('dist'));
});

gulp.task('bowerFilesMin', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  return gulp.src(bowerFilesMin, { base: './bower_components/' })
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src(paths.less)
    .pipe(less())
    //.pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    //.pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('partials', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.partials)
    .pipe(gulp.dest('./dist/partials'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  var server = livereload();
  gulp.watch([
      paths.scripts,
      paths.partials,
      paths.less
    ], ['build']).on('change', function (file) {
      server.changed(file.path);
    });
});

gulp.task('test', function () {
  // Be sure to return the stream
  return gulp.src([paths.dist, paths.test_helpers, paths.scripts, paths.tests])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('dist', ['bowerFiles', 'scripts', 'partials', 'styles']);

gulp.task('build', function(callback) {
  runSequence('clean',
    ['dist'],
    callback);
});

gulp.task('default', ['watch']);