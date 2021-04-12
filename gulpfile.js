const { parallel } = require('gulp');
const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');


gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    return gulp.src([

                    //подключение библиотек :

                    //  "node_modules/jquery/dist/jquery.min.js",
                    //  "node_modules/slick-carousel/slick/slick.min.js",
                    //  "node_modules/jquery-validation/dist/jquery.validate.min.js",
                    //  "jquery.maskedinput-master/dist/jquery.maskedinput.min.js",
                    //  "WOW-master/dist/wow.min.js",
                     "src/js/_script.js"
                    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
  });

gulp.task('watch', function(){
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"))
    gulp.watch(['src/js/_script.js'], gulp.parallel('scripts'));
    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('fonts', function(){
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});


gulp.task('mailer', function(){
    return gulp.src("src/mailer/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function(){
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'))