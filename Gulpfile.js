"use strict"
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var STATIC_PATH = 'app/static';
var SASS_PATTERN = STATIC_PATH + '/scss/**/*.scss';

gulp.task('styles', function(){
	return gulp.src(SASS_PATTERN)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(STATIC_PATH + '/css/'))
		.pipe(browserSync.stream());
})

gulp.task('serve', ['styles'], function(){
	browserSync.init({
		server: 'app/'
	})


	gulp.watch(SASS_PATTERN, ['styles']);
	gulp.watch('app/**/*.js').on('change', browserSync.stream);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
})

gulp.task('default', ['serve']);