'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat'); 
var connect = require('connect'); 
var lr = require('tiny-lr');
var livereload = require('gulp-livereload');
require('dotenv').config();

var user = process.env.USER;
var password = process.env.PASSWORD;

var localFiles = [
    './dist/**',
    './music.php',
    './video.php',
    './index.php',
    './logout.php',
    './.htaccess',
    './.htpasswd'
];

var remoteLocation = './www/';

function getFtpConnection() {
    return ftp.create({
        host: "anton-sementsov.bplaced.net",
        port: 21,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    })
};

//deploy to remote server
gulp.task('deploy', async function() {
    var conn = getFtpConnection()
    return gulp.src(localFiles, {base: '.', buffer: false})
        .pipe(conn.newer(remoteLocation))
        .pipe(conn.dest(remoteLocation))
});

//compile sass
 gulp.task('sass', async function () {
     gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    }); 

gulp.task('scripts', function() {
        return gulp.src('src/js/**/*.js')
          // Minify the file
          .pipe(uglify())
          // Output
          .pipe(gulp.dest('dist/js'))
    });

gulp.task('copy', async function() {
      gulp.src('src/template/**/*.php').pipe(gulp.dest('dist/template/'))
      gulp.src('src/helpers/**/*.php').pipe(gulp.dest('dist/helpers/'))
      gulp.src('src/content/**/*.php').pipe(gulp.dest('dist/content/'));
     ;
  });

// Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src(['./**/*.html'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/**/*.php', gulp.parallel('copy'));    
  //  gulp.watch('src/img/*', gulp.series('images')); deactivated because not used
  });

  // Clean assets
function clean() {
    return del(["./dist/"]);
  }

  const build = gulp.series(clean, gulp.parallel('sass','scripts','copy'));

  exports.default = build; 
  exports.build = build; 