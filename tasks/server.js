import gulp from 'gulp';




import livereload      from  "gulp-server-livereload";



const server = () => {
    return gulp.src('./public/')
    .pipe(livereload({
        livereload: true,
        open: true
    }))
};      

export default server; 