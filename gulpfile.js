'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var sass = require('gulp-sass');
require('dotenv').config();

var user = process.env.USER;
var password = process.env.PASSWORD;

var localFiles = [
    './dist/**',
    './index.php'
];

var remoteLocation = './www/';

async function getFtpConnection(){
    return ftp.create({
        host: "anton-sementsov.bplaced.net",
        port: 21,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    })
}

//deploy to remote server
gulp.task('deploy',function(){
    var conn = getFtpConnection();
    return gulp.src(localFiles, {base: '.', buffer: false})
        .pipe(conn.newer(remoteLocation))
        .pipe(conn.dest(remoteLocation))
});

//compile sass
gulp.task('sass', async function () {
    gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    });

//default    
gulp.task('default', function(done) {  //<---- Insert 'done' as a parameter here...
gulp.series('sass')
done(); //<---- ...and call it here
})