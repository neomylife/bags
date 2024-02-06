import gulp from 'gulp';


import imagemin from 'gulp-imagemin';
import fileinclude from "gulp-file-include";
import webp from "gulp-webp";




const html = () => {
    return gulp.src('./src/html/*.html')
    .pipe(fileinclude())
     .pipe(gulp.dest('./public'))
};
const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(webp())
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
};



export {img} ;