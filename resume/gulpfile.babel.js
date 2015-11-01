'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Compile stylesheets
gulp.task('styles', () => {
  return gulp.src([
    'style.scss'
  ])
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'resume',
    server: ['dist', '.']
  });

  gulp.watch(['style.scss'], ['styles', reload]);
  gulp.watch(['index.html'], reload);
});

