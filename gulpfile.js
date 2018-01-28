var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var uglify = require("gulp-uglifyjs");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var del = require("del");
var imagemin = require("gulp-imagemin"); 
var pngquant    = require("imagemin-pngquant");
var cache = require ("gulp-cache");
var autoprefixer = require("gulp-autoprefixer");
var concatCss = require('gulp-concat-css');

gulp.task("default", ["watch"])

gulp.task("sass", function(){
	gulp.src("app/scss/*.scss")
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer(['last 2 versions'], { cascade: true }))
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("scriptslibs", function(){
	gulp.src([
		"app/libs/jquery/dist/jquery.min.js",
		"app/libs/slick/dist/slick.min.js"
		])
	.pipe(concat("libs.min.js"))
	.pipe(gulp.dest("app/js"))
});

gulp.task("css-libs", function(){
	gulp.src([
		"app/libs/slick/slick-theme.css",
		"app/libs/slick/slick.css"
		])
	.pipe(concatCss("libs.min.css"))
	.pipe(gulp.dest("app/scss"))
});

gulp.task("browser-sync", function(){
	browserSync({
		server: {
			baseDir:"dist"
		},
		notify: false
	})
})

gulp.task("html", function(){
	gulp.src("app/*.html")
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("img", function(){
	return gulp.src("app/img/**/*")
	.pipe(gulp.dest("dist/img"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("scripts", function(){
	gulp.src("app/js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("css", function(){
	gulp.src("app/scss/*.css")
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("fonts", function(){
	gulp.src("app/fonts/**/*")
	.pipe(gulp.dest("dist/fonts"))
	.pipe(browserSync.reload({stream: true}))
});



  gulp.task("watch", [ "css-libs", "scriptslibs", "html", "scripts", "sass", "css", "fonts", "img", "browser-sync"],  function(){
  	gulp.watch("app/scss/*.scss", ["sass"])
  	gulp.watch("app/*.html", ['html'])
  	gulp.watch("app/js/*.js", ['scripts'])
  	gulp.watch("app/img/**/*", ['img'])
  	gulp.watch("app/css/*.css", ['css'])
  	gulp.watch("app/fonts/**/*", ['fonts'])
  });
