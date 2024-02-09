
import gulp from 'gulp';

import changed         from  "gulp-changed";
import webp            from  "gulp-webp";
import imagemin        from  "gulp-imagemin";



import  path    from     '../config/path.js';

const img = () => {
    return gulp.src('./src/img/**/*')
    .pipe(changed(path.img.dest))
    .pipe(webp())
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed(path.img.dest))
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(path.img.dest))
};


export default img; 