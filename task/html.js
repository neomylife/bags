
import gulp from 'gulp';

import fileinclude     from  "gulp-file-include";
import htmlmin         from  "gulp-htmlmin";
import plumber         from  "gulp-plumber";
import notify          from  "gulp-notify";
import changed         from  "gulp-changed";
import webpHTML        from  "gulp-webp-html";


import  path    from     '../config/path.js';

const html = () => {
    return gulp.src(path.html.src)
    .pipe(changed('./public/'))
    .pipe(plumber({
        errorHandler: notify.onError({
            title: "Styles",
            message:"Error: <%= error.message %>",
            sound: false
            
        })}))
    .pipe(fileinclude())
    .pipe(webpHTML())
    .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest(path.html.dest))
};

export default html; 