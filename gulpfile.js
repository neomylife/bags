import gulp from 'gulp';


import imagemin from 'gulp-imagemin';
import fileinclude from "gulp-file-include";
import webp from "gulp-webp";
import htmlmin from "gulp-htmlmin";
import livereload from "gulp-server-livereload";




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
export {watcher} ;
export {server} ;
export const dev = gulp.series(
    html,
    gulp.parallel(server, watcher)
    );

export default dev;