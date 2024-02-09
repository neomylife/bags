import gulp from 'gulp';



import  path    from     '../config/path.js';

import changed         from  "gulp-changed";
import webpack         from  "webpack-stream";
import babel           from  "gulp-babel";



const js = () => {
    return gulp.src(path.js.src)
    .pipe(changed(path.js.dest))
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
    .pipe(gulp.dest(path.js.dest))
};

export default js; 