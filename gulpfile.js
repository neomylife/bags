import gulp from 'gulp';


import imagemin from 'gulp-imagemin';
import fileinclude from "gulp-file-include";
import webp from "gulp-webp";
import htmlmin from "gulp-htmlmin";




const html = () => {
    return gulp.src('./src/html/*.html')
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./public'))
};
const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(webp())
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
};


const watcher = () => {
    gulp.watch('./src/html/**/*', html)
};      


export {html} ;
export {img} ;
export {watcher} ;