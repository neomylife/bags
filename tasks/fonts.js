import gulp from 'gulp';

import changed         from  "gulp-changed";
import fonter          from  "gulp-fonter";
import ttf2woff2       from  "gulp-ttf2woff2";




import  path    from     '../config/path.js';

const fonts = () => {
    return gulp.src(path.fonts.src)
    .pipe(changed(path.fonts.dest))
    .pipe(fonter({
        formats: ['woff', 'ttf', ]
    }))
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.fonts.dest))
};


export default fonts; 