/**
 * @desc 
 * @author Jooger <zzy1198258955@163.com>
 * @date 10 Nov 2017
 */

'use strict'

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-minify-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()

// Static server
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

// Build css files
gulp.task('compressCSS', function () {
  gulp.src('style/style.styl')
    .pipe(stylus())
    .pipe(prefix(['last 15 versions', '> 1%'], {
      cascade: true
    }))
    .pipe(minify())
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

// Watch files for changes & recompile
gulp.task('watch', function () {
  gulp.watch(['style/*.styl'], ['compressCSS'], ['compressJS'])
})

gulp.task('default', ['compressCSS', 'compressJS', 'browserSync', 'watch'])