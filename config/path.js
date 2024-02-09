
const pathSrc  = "./src";
const pathDest = "./public";


export default {
    root: pathDest,

    html:{
        src: pathSrc   + "/html/**/*.html",
        watch: pathSrc + "/html/**/*.html",
        dest: pathDest
    },
    
    scss:{
        src: pathSrc   + "/scss/**/*.scss",
        watch: pathSrc + "/scss/**/*.scss",
        dest: pathDest + "/css",
    },
    
    js:{
        src: pathSrc   + "/js/**/*.js",
        watch: pathSrc + "/js/**/*.js",
        dest: pathDest + "/js",
    },
  
    img:{
        src: pathSrc   + "/img/**/*",
        watch: pathSrc + '/img/**/*',
        dest: pathDest + "/img",
    },
    
    fonts:{
        src: pathSrc   +  "/fonts/**/*",
        watch: pathSrc +  "/fonts/**/*",
        dest: pathDest +  "/fonts",
    },
}