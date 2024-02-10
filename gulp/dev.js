
import gulp from 'gulp';


//HTML
import fileinclude     from  "gulp-file-include";

import changed         from  "gulp-changed";



const html = () => {

    return gulp.src(['./src/html/**/*.html','!./src/html/blocks/**/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath:'@file'
    }))
    .pipe(gulp.dest("./dest"))

};




//SCSS
import sourcemaps      from  "gulp-sourcemaps";
import sassGlob        from  "gulp-sass-glob";
import concat          from  "gulp-concat";
import webpCSS         from  "gulp-webp-css";

import  dartSass       from 'sass';
import  gulpSass       from 'gulp-sass';
const   sass = gulpSass(dartSass);


const scss = () => {
    return gulp.src("./src/scss/**/*.scss")
    .pipe(changed("./dest/css"))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dest/css"))
}


// JS

import webpack         from  "webpack-stream";
import babel           from  "gulp-babel";



const js = () => {
    return gulp.src("./src/js/**/*.js")
    .pipe(changed("./dest/js"))
    .pipe(webpack({
        config : {
            mode:'production',
        
            entry: {
                index: './src/js/index.js',
                //contacts: './src/js/contacts.js',
                //about: './src/js/about.js',
            },
            output:{
                filename:'[name].bundle.js',
            }}
      }))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest("./dest/js"))
};



// IMG

import webp            from  "gulp-webp";
import imagemin        from  "gulp-imagemin";

const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(changed("./dest/img"))

    .pipe(gulp.dest("./dest/img"))
};



// FONTS

import fonter          from  "gulp-fonter";
import ttf2woff2       from  "gulp-ttf2woff2";

const fonts = () => {
    return gulp.src("./src/fonts/**/*")
    .pipe(changed("./dest/fonts"))
    .pipe(fonter({
        formats: ['woff', 'ttf', ]
    }))
    .pipe(gulp.dest("./dest/fonts"))
    .pipe(ttf2woff2())
    .pipe(gulp.dest("./dest/fonts"))
};


//DEL

import {deleteAsync}   from  'del';



const clean = () => {
    return deleteAsync('./dest/')
   
};



//SERVER

import livereload      from  "gulp-server-livereload";

const server = () => {
    return gulp.src('./dest/')
    .pipe(livereload({
        livereload: true,
        open: true
    }))
};    


//WATCH

const watcher = () => {
    gulp.watch("./src/html/**/*",   html);
    gulp.watch("./src/scss/**/*",   scss);
    gulp.watch("./src/js/**/*",     js);
    gulp.watch("./src/img/**/*",    img);
    gulp.watch("./src/fonts/**/*",  fonts);
};   



// EXPORTS
export  {html}; 
export  {scss}; 
export  {js}; 
export  {img}; 
export  {fonts}; 
export  {clean}; 
export  {server}; 
export  {watcher};

export const dev = gulp.series(
    clean,
    gulp.parallel(html,img,scss,js,fonts),
    gulp.parallel( watcher, server)
    );


export default dev;