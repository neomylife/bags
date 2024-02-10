
import gulp from 'gulp';


//HTML
import fileinclude     from  "gulp-file-include";
import htmlmin         from  "gulp-htmlmin";
import plumber         from  "gulp-plumber";
import notify          from  "gulp-notify";
import changed         from  "gulp-changed";
import webpHTML        from  "gulp-webp-html";


const html = () => {


    return gulp.src(['./src/html/**/*.html','!./src/html/blocks/**/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath:'@file'
    }))
    .pipe(webpHTML())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"))
};




//SCSS
import sassGlob        from  "gulp-sass-glob";
import autoprefixer    from  "gulp-autoprefixer";
import csso            from  "gulp-csso";
import concat          from  "gulp-concat";
import rename          from  "gulp-rename";
import webpCSS         from  "gulp-webp-css";
import mediaqueries    from  "gulp-group-css-media-queries";

import  dartSass       from 'sass';
import  gulpSass       from 'gulp-sass';
const   sass = gulpSass(dartSass);


const scss = () => {
    return gulp.src("./src/scss/**/*.scss")
    .pipe(changed("./build/css"))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCSS())
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./build/css"))
    .pipe(rename({suffix: ".min"}))
    .pipe(mediaqueries())
    .pipe(csso())
    .pipe(gulp.dest("./build/css"))
}


// JS

import webpack         from  "webpack-stream";
import babel           from  "gulp-babel";



const js = () => {
    return gulp.src("./src/js/**/*.js")
    .pipe(changed("./build/js"))
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
    .pipe(gulp.dest("./build/js"))
};



// IMG

import webp            from  "gulp-webp";
import imagemin        from  "gulp-imagemin";

const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(changed("./build/img"))
    .pipe(webp())
    .pipe(gulp.dest("./build/img"))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed("./build/img"))
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest("./build/img"))
};



// FONTS

import fonter          from  "gulp-fonter";
import ttf2woff2       from  "gulp-ttf2woff2";

const fonts = () => {
    return gulp.src("./src/fonts/**/*")
    .pipe(changed("./build/fonts"))
    .pipe(fonter({
        formats: ['woff', 'ttf', ]
    }))
    .pipe(gulp.dest("./build/fonts"))
    .pipe(ttf2woff2())
    .pipe(gulp.dest("./build/fonts"))
};


//DEL

import {deleteAsync}   from  'del';



const clean = () => {
    return deleteAsync('./build/')
   
};



//SERVER

import livereload      from  "gulp-server-livereload";

const server = () => {
    return gulp.src('./build/')
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

export const docs = gulp.series(
    clean,
    gulp.parallel(html,img,scss,js,fonts),
    gulp.parallel( watcher, server)
    );


export default docs;