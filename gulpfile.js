import gulp from 'gulp';

import gulpLoadPlugins from  "gulp-load-plugins";

const $ = gulpLoadPlugins({lazy:false})

import fileinclude     from  "gulp-file-include";
import webp            from  "gulp-webp";
import htmlmin         from  "gulp-htmlmin";
import livereload      from  "gulp-server-livereload";
import plumber         from  "gulp-plumber";
import notify          from  "gulp-notify";
import {deleteAsync}   from  'del';
import sourcemaps      from  "gulp-sourcemaps";
import sassGlob        from  "gulp-sass-glob";
import autoprefixer    from  "gulp-autoprefixer";
import csso            from  "gulp-csso";
import concat          from  "gulp-concat";
import rename          from  "gulp-rename";
import babel           from  "gulp-babel";
import uglify          from  "gulp-uglify";
import imagemin        from  "gulp-imagemin";
import changed         from  "gulp-changed";
import webpack         from  "webpack-stream";
import webpHTML        from  "gulp-webp-html";
import webpCSS         from  "gulp-webp-css";
import fonter          from  "gulp-fonter";
import ttf2woff2       from  "gulp-ttf2woff2";

import  dartSass from 'sass';
import  gulpSass from 'gulp-sass';
const   sass = gulpSass(dartSass);




const html = () => {
    return gulp.src('./src/html/*.html')
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
     .pipe(gulp.dest('./public'))
};


const scss = () => {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(changed('./public/css'))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCSS())
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    //.pipe(mediaqueries())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/'))
}


const js = () => {
    return gulp.src('./src/js/**/*')
    .pipe(changed('./public/js'))
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
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
};

const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(changed('./public/img'))
    .pipe(webp())
    .pipe(gulp.dest('./public/img'))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./public/img'))
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('./public/img'))
};

const fonts = () => {
    return gulp.src('./src/fonts/**/*')
    .pipe(changed('./public/fonts'))
    .pipe(fonter({
        formats: ['woff', 'ttf', ]
    }))
    .pipe(gulp.dest('./public/fonts'))
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./public/fonts'))
};

const clean = () => {
    return deleteAsync('./public/')
   
};


const watcher = () => {
    gulp.watch('./src/html/**/*', html);
    gulp.watch('./src/scss/**/*', scss);
    gulp.watch('./src/img/**/*', img);
    gulp.watch('./src/js/**/*', js);
};      
const server = () => {
    return gulp.src('./public/')
    .pipe(livereload({
        livereload: true,
        open: true
    }))
};      


 const build = gulp.series(
    clean,
    gulp.parallel(html,img,scss,js,fonts),
    );

export {html} ;
export {img} ;
export {clean} ;
export {watcher} ;
export {server} ;
export {scss} ;
export {js} ;
export {fonts} ;
export {build} ;




export const dev = gulp.series(
    build,
    gulp.parallel(server, watcher)
    );


export default dev;