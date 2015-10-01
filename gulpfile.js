'use strict';

var util = require('util'),
    fs = require('fs'),
    gulp = require('gulp'),
    rimraf = require('rimraf'),
    bower = require('gulp-bower'),
    revision = require('git-rev'),
    mocha = require('gulp-mocha'),
    shell = require('gulp-shell'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    istanbul = require('gulp-istanbul'),
    stylish = require('jshint-stylish'),
    istanbulReport = require('gulp-istanbul-report');

var coverageFile = './coverage/coverage-final.json';

var buildMethods = {
  html:function() {
    return gulp.src('./lib/html/**/*')
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
  },
  images:function() {
      return gulp.src('./lib/images/**/*')
        .pipe(gulp.dest('./dist/images'))
        .pipe(connect.reload());
  },
  fonts:function() {
    return gulp.src('./lib/fonts/**/*')
      .pipe(gulp.dest('./dist/font'))
      .pipe(connect.reload());
  },
  compass:function() {
    gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css'
      }))
      .pipe(connect.reload());
  },
  compassMin:function() {
    gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css',
        style: 'compressed'
      }))
      .pipe(connect.reload());
  },
  jspmBundle:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js'
      ]))
      .pipe(connect.reload());
  },
  jspmBundleMin:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js --minify'
      ]))
      .pipe(connect.reload());
  },
  clean:function(cb) {
    rimraf('./dist', function(err){
      if(err) return cb(err);
      rimraf('./.sass-cache', cb);
    });
  },
  install:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm install'
      ]));
  },
  version:function(cb) {
    revision.long(function(rev){
      var versionInfo = util.format('%s || %s', require('./package.json').version, rev);
      fs.writeFile('dist/version.html', versionInfo, cb);
    });
  },
  pretest:function() {
    return gulp.src('./lib/js/**/*.js')
      // Right there
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(istanbul({includeUntested: true}))
      .pipe(istanbul.hookRequire());
  },
  test:function () {
    gulp.src('./test/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(mocha())
      .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [ 'lcov', 'text-summary', 'json' ],
        reportOpts: {
          lcov: { dir: './coverage', file: './coverage/lcov.info'},
          json: { dir: './coverage', file: './coverage.json'}
        }
      }));

  },
  cleanCoverage:function(cb){
    rimraf('./coverage', cb);
  }
};
// livereload server
gulp.task('connect', function() {
  return connect.server({
    root: 'dist',
    livereload: true,
    port: 5003
  });
});

/* Ability to watch without clean and install */
// copy HTML changes
gulp.task('html-watch', buildMethods.html);

// copy image changes
gulp.task('images-watch', buildMethods.images);

// copy font changes
gulp.task('fonts-watch', buildMethods.fonts);

// compile SASS w/ compass (this could be nicer)
gulp.task('compass-watch', buildMethods.compass);

gulp.task('jspm-bundle-watch', buildMethods.jspmBundle);
/* End watch tasks*/

/* Test methods */
// clean coverage folder
gulp.task('cleanCoverage', buildMethods.cleanCoverage);

// pretest
gulp.task('pre-test', buildMethods.pretest);

// run tests
gulp.task('test', ['cleanCoverage','pre-test'], buildMethods.test);
/* end test methods */

/* Build methods*/
// copy HTML changes
gulp.task('html', ['install'], buildMethods.html);

// copy image changes
gulp.task('images', ['install'], buildMethods.images);

// copy font changes
gulp.task('fonts', ['install'], buildMethods.fonts);

// compile SASS w/ compass (this could be nicer)
gulp.task('compass', ['install'], buildMethods.compass);

// compile minified SASS w/ compass
gulp.task('compass-min', ['install'], buildMethods.compassMin);

// bundle jspm
gulp.task('jspm-bundle', ['install'], buildMethods.jspmBundle);

// bundle minified jspm
gulp.task('jspm-bundle-min', ['install'], buildMethods.jspmBundleMin);

gulp.task('clean', buildMethods.clean);

gulp.task('install', ['clean'], buildMethods.install);

gulp.task('version', ['html'], buildMethods.version);

// `gulp watch` to develop a remotely-hosted build
gulp.task('watch', ['images', 'fonts', 'compass', 'jspm-bundle', 'version'], function() {
  gulp.watch('./lib/html/**/*', ['html-watch'], function() {
    notify('Bundled HTML!');
  });
  gulp.watch('./lib/images/**/*', ['images-watch'], function() {
    notify('Bundled Images!');
  });
  gulp.watch('./lib/fonts/**/*', ['fonts-watch'], function() {
    notify('Bundled Fonts!');
  });
  gulp.watch('./lib/scss/**/*.scss', ['compass-watch'], function() {
    notify('Bundled .scss!');
  });
  gulp.watch(['index.js', './lib/js/**/*.js'], ['jspm-bundle-watch'], function() {
    notify('')
  });
});


// build dist
gulp.task('default', ['images', 'fonts', 'compass', 'jspm-bundle', 'version'],function(){
  process.exit(0);
});

// develop a locally-hosted build
gulp.task('host', ['watch', 'connect']);

// build dist for production
gulp.task('package', ['images', 'fonts', 'compass-min', 'jspm-bundle-min','version'], function(){
  process.exit(0);
});
