import gulp from 'gulp';


import imagemin from 'gulp-imagemin';
import fileinclude from "gulp-file-include";
import webp from "gulp-webp";
import htmlmin from "gulp-htmlmin";
import livereload from "gulp-server-livereload";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import {deleteAsync} from 'del';
import sourcemaps from  "gulp-sourcemaps";
import sassGlob from  "gulp-sass-glob";

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);




const html = () => {
    return gulp.src('./src/html/*.html')
    .pipe(plumber({
        errorHandler: notify.onError({
            title: "Styles",
            message:"Error: <%= error.message %>",
            sound: false
            
        })}))
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./public'))
};


const scss = () => {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    //.pipe(mediaqueries())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.public/css/'))
}


const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(webp())
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
};

const clean = () => {
    return deleteAsync('./public/')
   
};


const watcher = () => {
    gulp.watch('./src/html/**/*', html)
};      
const server = () => {
    return gulp.src('./public/')
    .pipe(livereload({
        livereload: true,
        open: true
    }))
};      
// const dev = gulp.series (
//     html,
//     watcher
// )


export {html} ;
export {img} ;
export {clean} ;
export {watcher} ;
export {server} ;
export {scss} ;


export const dev = gulp.series(
    clean,
    html,
    gulp.parallel(server, watcher)
    );

export default dev;