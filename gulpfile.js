import gulp from 'gulp';

//import plugins from  "gulp-load-plugins";

//const gl = plugins();




import  path    from     './config/path.js';


import  html    from     './tasks/html.js';
import  scss    from     './tasks/scss.js';
import  js      from     './tasks/js.js';
import  img     from     './tasks/img.js';
import  fonts   from     './tasks/fonts.js';
import  clean   from     './tasks/clean.js';
import  server  from     './tasks/server.js';





const watcher = () => {
    gulp.watch(path.html.watch, html);
    gulp.watch(path.scss.watch, scss);
    gulp.watch(path.img.watch,  img);
    gulp.watch(path.js.watch,   js);
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
    gulp.parallel( watcher, server)
    );


export default dev;