const { watch, src, dest, parallel, series } = require('gulp');
const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

//Copy all html files from your app folder to dist folder
function html() {
    console.log('moving html files to dist')
    return src('app/**.html')   
        .pipe(dest('dist/'))
}

//Convert sass files to .css
function css() {
    console.log('convert sass to css')
    return src('app/scss/main.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        //minify css
        .pipe(dest('app/css'))
        .pipe(minifyCSS())
        .pipe(dest('dist/css'))
        

}

//compress images
function images() {
    console.log('minify images')
     return src("app/images/**/*.{png,jpg,jpeg,svg}")
         .pipe(imagemin())
         .pipe(dest("dist/images"));
}


function js() {
    return src('app/js/*.js', { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: true }))
}

function watchFiles(cb) {
     browserSync.init({
         watch: true,
         files: ['./app/**/*'],
         server: "./app"
     });
}

exports.default = function () {
   watch('app/scss/*.scss', css);
   watch('app/*.html', html);
   //watch(src('app/*'), watchFiles);
}
// exports.js = js;
// exports.css = css;
// exports.html = html;
// exports.images = images;
// exports.watch = watchFiles;
// exports.build = series(images, parallel(html, css, js));


