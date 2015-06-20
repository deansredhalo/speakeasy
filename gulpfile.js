'use strict';

var debug = false;

// reqs
var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	reactify = require('reactify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	bower = require('main-bower-files'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	size = require('gulp-size'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade');

// tasks
gulp.task('copy-components', function() {
	return gulp.src('./dev/assets/components/*.js')
		.pipe(gulp.dest('./build/assets/components'))
		.pipe(size());
});

gulp.task('transform', function() {
	return gulp.src('./dev/assets/components/*.js*')
		.pipe(babel())
		.pipe(concat('./components.js'))
		.pipe(browserify({ transform: ['reactify'] }))
		.pipe(rename(function (path) { path.extname = '.js' }))
		.pipe(gulp.dest('./build/assets/components'))
		.pipe(size());
});

gulp.task('transpile', function() {
	return gulp.src('./dev/assets/scripts/*.js')
		.pipe(babel())
		.pipe(concat('./scripts.js'))
		.pipe(gulp.dest('./build/assets/scripts'))
		.pipe(size());	
});

gulp.task('stylus', function () {
	return gulp.src('./dev/assets/styles/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./build/assets/styles'))
		.pipe(size());
});

gulp.task('jade', function() {
	return gulp.src('./dev/assets/templates/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build/assets/templates'))
		.pipe(size());
});

gulp.task('copy-application-files', function() {
	return gulp.src('./dev/application/*.py')
		.pipe(gulp.dest('./build'))
		.pipe(size());
});

gulp.task('copy-manifests', function() {
	return gulp.src('./dev/assets/manifests/**/*')
		.pipe(gulp.dest('./build/assets/manifests'))
		.pipe(size());
});

gulp.task('copy-dependencies', function() {
	return gulp.src(bower({ base: './dev/assets/bower_components' }))
        .pipe(plumber())
        .pipe(uglify({
            output: { 
                beautify: debug,
                comments: debug ? true : /^!|\b(copyright|license)\b|@(preserve|license|cc_on)\b/i,
            },
            compress: { 
                sequences: !debug,
                booleans: !debug,
                conditionals: !debug,
                hoist_funs: false,
                hoist_vars: debug,
                warnings: debug,
            },
            mangle: !debug,
            outSourceMap: true,
            basePath: './build/assets/dependencies',
            sourceRoot: '/'
        }))
        .pipe(concat('./dependencies.js', {
            newLine:'\n;' 
        }))
        .pipe(browserify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/assets/dependencies'))
        .pipe(size());
});

gulp.task('clean', function() {
	return gulp.src(['./build/scripts', './build/components/', './build/dependencies'])
		.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch('./dev/assets/scripts/*.js', ['transpile']);
	gulp.watch('./dev/assets/styles/*.styl', ['stylus']);
	gulp.watch('./dev/assets/templates/*.jade', ['jade']);
	gulp.watch('./dev/application/*.py', ['copy-application-files']);
});

gulp.task('default', ['clean', 'transform', 'transpile', 'stylus', 'jade', 'copy-application-files', 'copy-manifests', 'copy-dependencies']);
