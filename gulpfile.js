'use strict';

// reqs
var gulp = require('gulp'),
	react = require('gulp-react'),
	clean = require('gulp-clean'),
	size = require('gulp-size'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade');

// tasks
gulp.task('transform', function() {
	return gulp.src('./speakeasy/assets/scripts/*.js')
		.pipe(react({ harmony: true, es6module: true }))
		.pipe(gulp.dest('./build/assets/scripts'))
		.pipe(size());
});

gulp.task('stylus', function () {
	return gulp.src('./speakeasy/assets/styles/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./build/assets/styles'))
		.pipe(size());
});

gulp.task('jade', function() {
	return gulp.src('./speakeasy/assets/templates/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build/assets/templates'))
		.pipe(size());
});

gulp.task('copy-application-files', function() {
	return gulp.src('./speakeasy/application')
		.pipe(gulp.dest('./build'))
		.pipe(size());
});

gulp.task('copy-bower-components', function() {
	return gulp.src('./speakeasy/assets/bower_components/**')
		.pipe(gulp.dest('./build/assets/vendor'))
		.pipe(size());
});

gulp.task('clean', function() {
	return gulp.src('./build/scripts')
		.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch('./speakeasy/assets/scripts/*.jsx', ['transform']);
	gulp.watch('./speakeasy/assets/styles/*.styl', ['stylus']);
	gulp.watch('./speakeasy/assets/templates/*.jade', ['jade']);
});

gulp.task('default', ['clean', 'transform', 'stylus', 'jade', 'copy-application-files', 'copy-bower-components']);
