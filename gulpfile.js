const { src, dest, parallel } = require('gulp');
//const minifyCSS = require('gulp-csso');


//Copy all html files from your app folder to dist folder
function html() {
    console.log('moving html files to dist')
    return src('src/html/**.*')   
        .pipe(dest('dist/'))
}

//Convert sass files to .css, minify css
function css() {
    return src('return/srcs*.sass')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('dist/css'))
}

function js() {
    return src('src/js/*.js', { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);
