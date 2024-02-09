import gulp from 'gulp';

//import plugins from  "gulp-load-plugins";

//const gl = plugins();




import  path    from     './config/path.js';


import  html    from     './task/html.js';
import  scss    from     './task/scss.js';
import  js      from     './task/js.js';
import  img     from     './task/img.js';
import  fonts   from     './task/fonts.js';
import  clean   from     './task/clean.js';
import  server  from     './task/server.js';





const watcher = () => {
    gulp.watch('./src/html/**/*', html);
    gulp.watch('./src/scss/**/*', scss);
    gulp.watch('./src/img/**/*', img);
    gulp.watch('./src/js/**/*', js);
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