'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
require('dotenv').config();

var user = process.env.USER;
var password = process.env.PASSWORD;

var localFiles = [
    './dist/**',
    './index.php'
];

var remoteLocation = './www/';

function getFtpConnection(){
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
})