---
layout: post
permalink: using-react-with-es6-and-browserify
title: Using React With ES6 And Browserify
date: 2015-10-12 22:00
categories: react es6 browserify babel javascript gulp
---

React is great. You can use es6 class and write isomorphic code with React. However, you need a build process so that your react code can run<!--more--> with these awesome feature.

In this post, I will use <a href="http://browserify.org/">Browerify</a> to bundle up all the required modules and use <a href="https://babeljs.io/">Babel</a> to transfrom es6 code. To automate these build processes, I'm going to use gulp, which is simple and easy to write tasks.

### Install the packages for building
<pre class="prettyprint language-js">
npm install --save-dev gulp browserify babelify vinyl-source-stream
</pre>

### Define tasks in gulpfile.js
<pre class="prettyprint language-js">
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({
    entries: './app.js',
    debug: true
  })
  // set stage to 0 so that we can use es6+ feature
  .transform(babelify.configure({
    stage: 0
  }))
  .bundle()
  // convert into a vinyl stream that gulp is expecting to get
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
</pre>