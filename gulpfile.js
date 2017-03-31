////////////////////////////////////////////////
// Required
////////////////////////////////////////////////

var gulp = require("gulp"),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
    pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer'),
	nodemon = require('gulp-nodemon');

////////////////////////////////////////////////
// Scripts Task
////////////////////////////////////////////////
gulp.task("scss", function(){
	gulp.src('./scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglifycss())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./public/css'))
		.pipe(reload({stream:true}));
});

////////////////////////////////////////////////
// HTML Task
////////////////////////////////////////////////
gulp.task('views', function buildHTML() {
  gulp.src('./views/*.pug')
});

////////////////////////////////////////////////
// Uglify Javascript
////////////////////////////////////////////////

// gulp.task("javascripts", function(){
// 	gulp.src('./clients/assets/js/**/*.js')
// 		.pipe(plumber())
// 		.pipe(reload({stream:true}))
// 	})

////////////////////////////////////////////////
// Browser-Sync Task
////////////////////////////////////////////////
gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {
		proxy: "http://localhost:9000",
		files: ["./views/**.*"],
		browser: "google chrome",
		port: 7000,
	});
})

////////////////////////////////////////////////
// Run Nodemon
////////////////////////////////////////////////
gulp.task('nodemon', function(cb){
	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function(){
		if(!started) {
			cb();
			started = true;
		}
	})
})
////////////////////////////////////////////////
// Watch Task
////////////////////////////////////////////////
gulp.task("watch", function(){
	gulp.watch('./scss/**/*.scss', ["scss"]);
	gulp.watch('./views/**/*.pug', ["views"]);

})
////////////////////////////////////////////////
// Default Task
////////////////////////////////////////////////
gulp.task("default", ["scss","browser-sync", "views", "watch"]);
