const { src, dest, parallel, series } = require('gulp');
const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');

//Copy all html files from your app folder to dist folder
function html() {
    console.log('moving html files to dist')
    return src('src/html/**.*')   
        .pipe(dest('dist/'))
}

//Convert sass files to .css
function css() {
    console.log('convert sass to css')
    return src('src/scss/main.scss')
        .pipe(sass())
        //minify css
        .pipe(minifyCSS())
        .pipe(dest('dist/css'))
}

//watch sass for changes


//compress images
function images() {
    console.log('minify images')
     return src("src/images/**/*.{png,jpg,jpeg,svg}")
         .pipe(imagemin())
         .pipe(dest("dist/img"));
}


function js() {
    return src('src/js/*.js', { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
//exports.series = series(images);
exports.default = series(images, parallel(html, css, js));

//exports.default = series(images, parallel(html, css, js));

