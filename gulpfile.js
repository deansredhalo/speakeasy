'use strict';

// reqs
var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	size = require('gulp-size'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade');

// tasks
gulp.task('transform', function() {
	return gulp.src('./dev/assets/components/*.jsx')
		.pipe(browserify({ transform: ['reactify'] }))
		.pipe(rename(function (path) { path.extname = '.js' }))
		.pipe(gulp.dest('./build/assets/components'))
		.pipe(size());
});

gulp.task('transpile', function() {
	return gulp.src('./dev/assets/scripts/*.js')
		.pipe(babel())
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

gulp.task('copy-bower-components', function() {
	return gulp.src('./dev/assets/bower_components/**')
		.pipe(gulp.dest('./build/assets/bower_components'))
		.pipe(size());
});

gulp.task('clean', function() {
	return gulp.src(['./build/scripts', './build/components/'])
		.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch('./dev/assets/scripts/*.js', ['transform']);
	gulp.watch('./dev/assets/styles/*.styl', ['stylus']);
	gulp.watch('./dev/assets/templates/*.jade', ['jade']);
	gulp.watch('./dev/application/*.py', ['copy-application-files']);
});

gulp.task('default', ['clean', 'transform', 'transpile', 'stylus', 'jade', 'copy-application-files', 'copy-manifests', 'copy-bower-components']);
