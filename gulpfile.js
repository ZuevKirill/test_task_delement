"use strict";

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    mainBowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync').create();

var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    cssmin = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    notify = require('gulp-notify'),
    ftp = require('vinyl-ftp');

var sitemap = require('gulp-sitemap');
var webp = require('imagemin-webp');
const extReplace = require("gulp-ext-replace");
var tinypng = require('gulp-tinypng');

var paths = {
    blocks: 'blocks/',
    devDir: 'app/',
    devDirInside: 'app/',
    outputDir: 'build/'
};


/*********************************
		Developer tasks
*********************************/

//pug compile
gulp.task('pug', function() {
    return gulp.src([paths.blocks + '*.pug',
            '!' + paths.blocks + 'template.pug'
        ])
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.devDir))
        .pipe(browserSync.stream())
});


//sass compile
gulp.task('sass', function() {
    return gulp.src(paths.blocks + '*.sass')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 10 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(paths.devDir + 'css/'))
        .pipe(browserSync.stream());
});

//js compile
gulp.task('scripts', function() {
    return gulp.src([
            paths.blocks + '**/*.js',
            '!' + paths.blocks + '_assets/**/*.js',
            '!' + paths.blocks + 'metrikayandex.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('vendors', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});
gulp.task('vendorsCSS', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest(paths.devDir + 'css/'))
        .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
    gulp.watch(paths.blocks + '**/*.pug', ['pug']);
    gulp.watch(paths.blocks + '**/*.sass', ['sass']);
    gulp.watch(paths.blocks + '**/*.js', ['scripts']);
});

//server
gulp.task('browser-sync', function() {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: paths.devDir
        }
    });
});


/*********************************
		Production tasks
*********************************/

//clean
gulp.task('clean', function(cb) {
    rimraf(paths.outputDir, cb);
});

//css + js
gulp.task('build', ['clean'], function() {
    return gulp.src(paths.devDir + '*.html')
        .pipe(gulp.dest(paths.outputDir));
});

gulp.task('buildhtml', function() {
    return gulp.src(paths.devDir + '*.html')
        .pipe(gulp.dest(paths.outputDir));
});

gulp.task('buildstyle', ['clean'], function() {
    return gulp.src(paths.devDir + 'css/*.css')
        .pipe(useref())
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulp.dest(paths.outputDir + 'css/'));
});
gulp.task('buildjs', ['clean'], function() {
    return gulp.src(paths.devDir + 'js/*.js')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(paths.outputDir + 'js/'));
});
//copy images to outputDir
gulp.task('imgBuild', ['clean'], function() {
    return gulp.src(paths.devDir + 'img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.outputDir + 'img/'));
});

//copy fonts to outputDir
gulp.task('fontsBuild', ['clean'], function() {
    return gulp.src(paths.devDir + '/fonts/*')
        .pipe(gulp.dest(paths.outputDir + 'fonts/'));
});

//ftp
gulp.task('send', function() {
    var conn = ftp.create({
        host: '5.188.28.168',
        user: 'refettorio.ru',
        password: 'fjoOvv3ks',
        parallel: 5
    });
    /* list all files you wish to ftp in the glob variable */
    var globs = [
        'build/**/*',
        '!node_modules/**' // if you wish to exclude directories, start the item with an !
    ];

    return gulp.src(globs, { base: './build', buffer: false })
        .pipe(conn.newer('/webinar/trendy-v-dizaine-obschepitov')) // only upload newer files
        .pipe(conn.dest('/webinar/trendy-v-dizaine-obschepitov'))
        .pipe(notify("Файл залит на FTP"));

});


gulp.task('tinypng', function () {
    gulp.src([paths.devDir + 'img/**/*.png',
    '!' + paths.devDir + 'img/favicon/*.png',
    '!' + paths.devDir + 'img/portfolio/**/*.png',
    '!' + paths.devDir + 'img/reviews/**/*.png',
    '!' + paths.devDir + 'img/clients/**/*.png'])
        .pipe(tinypng('vJZr0pBNHmp59CfRSPKsmVdlsn7hrNhj'))
        .pipe(gulp.dest(paths.outputDir + 'img/tiny/'));
});

gulp.task("exportwebp", function() {
    return gulp.src(paths.devDir + 'img/**/*.+(jpg|png)')
      .pipe(imagemin([
        webp({
          quality: 50
        })
      ]))
      .pipe(extReplace(".webp"))
      .pipe(gulp.dest(paths.outputDir + 'img/webp/'));
  });     

//otherFiles
gulp.task('siteMap', function() {
    gulp.src('build/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'https://apriori-marketing.ru'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('robottxt', function() {
    return gulp.src(paths.devDir + '*.txt')
        .pipe(gulp.dest(paths.outputDir));
});

gulp.task('htaccess', function() {
    return gulp.src(paths.devDir + '.htaccess')
        .pipe(gulp.dest(paths.outputDir));
});


//default
gulp.task('default', ['browser-sync', 'watch', 'pug', 'sass', 'scripts', 'vendors', 'vendorsCSS']);

//production
gulp.task('building', ['clean', 'build', 'buildstyle', 'buildjs', 'imgBuild', 'fontsBuild']);

//production
gulp.task('builhtml', ['build', 'buildstyle', 'buildjs']);

//otherFiles
gulp.task('other', ['siteMap', 'robottxt', 'htaccess']);