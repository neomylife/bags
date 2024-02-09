
import gulp from 'gulp';

import fileinclude     from  "gulp-file-include";
import htmlmin         from  "gulp-htmlmin";
import plumber         from  "gulp-plumber";
import notify          from  "gulp-notify";
import changed         from  "gulp-changed";
import webpHTML        from  "gulp-webp-html";


import  path    from     '../config/path.js';

const html = () => {


    return gulp.src(['./src/html/**/*.html','!./src/html/blocks/**/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath:'@file'
    }))
    
    .pipe(gulp.dest(path.html.dest))
};

export default html; 