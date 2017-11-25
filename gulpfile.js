/**
 * @desc Gulp Gulp，give me a job 🙏
 * @author Jooger <iamjooger@gmail.com>
 * @date 10 Nov 2017
 */

'use strict'

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-minify-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const isDev = process.env.NODE_ENV === 'development'

// Static server
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

// Build css files
gulp.task('compressCSS', function () {
  gulp.src('style/index.styl')
    .pipe(stylus())
    .pipe(prefix(['last 15 versions', '> 1%'], {
      cascade: true
    }))
    // .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

// Compress js
gulp.task('compressJS', function () {
  gulp.src('script/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

// Compress html
gulp.task('compressHtml', function () {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('moveFonts', function () {
  return gulp.src('fonts/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Watch files for changes & recompile, only for dev env
gulp.task('watch', function () {
  gulp.watch(['style/*.styl'], ['compressCSS'])
  gulp.watch(['script/*.js'], ['compressJS'])
  gulp.watch(['index.html'], ['compressHtml'])
})

gulp.task(
  'default',
   ['compressCSS', 'compressJS', 'compressHtml', 'moveFonts'].concat(isDev ? ['browserSync', 'watch'] : [])
)