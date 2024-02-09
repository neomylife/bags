import gulp from 'gulp';

import sourcemaps      from  "gulp-sourcemaps";
import sassGlob        from  "gulp-sass-glob";
import autoprefixer    from  "gulp-autoprefixer";
import csso            from  "gulp-csso";
import concat          from  "gulp-concat";
import rename          from  "gulp-rename";
import changed         from  "gulp-changed";
import webpCSS         from  "gulp-webp-css";

import  dartSass       from 'sass';
import  gulpSass       from 'gulp-sass';
const   sass = gulpSass(dartSass);


import  path    from     '../config/path.js';

const scss = () => {
    return gulp.src(path.scss.src)
    .pipe(changed(path.scss.dest))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCSS())
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.scss.dest))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    //.pipe(mediaqueries())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.scss.dest))
}


export default scss; 