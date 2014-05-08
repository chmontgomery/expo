var gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  karma = require('gulp-karma'),
  runSequence = require('run-sequence'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon');

var paths = {
  scripts: './src/client/js/**/*.js',
  partials: './src/client/partials/**/*.html',
  less: './src/client/less/**/*.less',
  tests: './test/client/js/**/*.js',
  angular_mocks: './bower_components/angular-mocks/angular-mocks.js',
  test_helpers: './test/client/js/helpers/testHelperService.js',
  dist: './dist/**/*.js',
  public: './dist/public'
}, bowerFiles = [
  './bower_components/angular/angular.js',
  './bower_components/angular-ui/build/angular-ui.js',
  './bower_components/angular-ui/build/angular-ui.css',
  './bower_components/jquery/dist/jquery.js',
  './bower_components/bootstrap/dist/css/bootstrap.css',
  './bower_components/bootstrap/dist/css/bootstrap.css.map',
  './bower_components/bootstrap/dist/css/bootstrap-theme.css',
  './bower_components/bootstrap/dist/css/bootstrap-theme.css.map',
  './bower_components/bootstrap/dist/js/bootstrap.js',
  './bower_components/bootstrap/dist/fonts/*',
  './bower_components/lodash/dist/lodash.js',
  './bower_components/moment/moment.js',
  './bower_components/angular-strap/dist/angular-strap.js',
  './bower_components/angular-strap/dist/angular-strap.tpl.js',
  './bower_components/angular-animate/angular-animate.js'
], bowerFilesMin = [
  './bower_components/angular/angular.min.js',
  './bower_components/angular-ui/build/angular-ui.min.js',
  './bower_components/angular-ui/build/angular-ui.min.css',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/bootstrap/dist/js/bootstrap.min.js',
  './bower_components/bootstrap/dist/css/bootstrap.min.css',
  './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
  './bower_components/bootstrap/dist/fonts/*',
  './bower_components/lodash/dist/lodash.min.js',
  './bower_components/moment/moment/min/moment.min.js',
  './bower_components/angular-strap/dist/angular-strap.min.js',
  './bower_components/angular-strap/dist/angular-strap.tpl.min.js',
  './bower_components/angular-animate/angular-animate.min.js'
];

require('load-common-gulp-tasks')(gulp, {
  paths: {
    lint: [
      './*.js',
      './src/controllers/**/*.js',
      './src/lib/**/*.js',
      './src/services/**/*.js'
    ],
    felint: [
      './src/client/**/*.js',
      './test/client/**/*.js'
    ],
    cover: [
      './src/controllers/**/*.js',
      './src/lib/**/*.js',
      './src/services/**/*.js',
      './server.js'
    ],
    test: [
      './test/server/**/*.js'
    ]
  },
  jshintrc: {
    server: '.jshintrc',
    client: 'client.jshintrc'
  }
});

// redefine since instanbul doesn't support ES6
gulp.task('ci', 'Lint, tests and test coverage', ['test', 'lint', 'felint']);
gulp.task('ci-watch', false, ['lint-watch', 'felint-watch', 'test']);

gulp.task('develop', 'Watch and restart server on change', ['build', 'watch'], function () {
  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: [],
    execMap: {
      js: "node --harmony"
    }
  })
    .on('change', ['ci-watch'])
    .on('restart', function () {
      var d = new Date();
      console.log(gutil.colors.bgBlue('server restarted at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
    });
});

gulp.task('clean', function () {
  return gulp.src(['./dist/*'], {read: false})
    .pipe(clean());
});

gulp.task('bower-files', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  return gulp.src(bowerFiles, { base: './bower_components/' })
    .pipe(gulp.dest(paths.public));
});

gulp.task('styles', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.public + '/css'));
});

gulp.task('scripts', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.public + '/js'));
});

gulp.task('partials', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.partials)
    .pipe(gulp.dest(paths.public + '/partials'));
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

var karmaPaths = [
  paths.dist,
  paths.angular_mocks,
  paths.test_helpers,
  paths.scripts,
  paths.tests
];

gulp.task('test', function () {
  return gulp.src(karmaPaths)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test-watch', function () {
  return gulp.src(karmaPaths)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('dist', ['bower-files', 'scripts', 'partials', 'styles']);

gulp.task('build', function (callback) {
  runSequence('clean',
    ['dist'],
    callback);
});