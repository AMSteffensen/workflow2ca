const { src, dest, parallel } = require('gulp');
//const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass')

//Copy all html files from your app folder to dist folder
function html() {
    console.log('moving html files to dist')
    return src('src/html/**.*')   
        .pipe(dest('dist/'))
}
//compile gulp.task(‘sass’, function () { gulp.src(‘app/scss/app.scss’) .pipe(sass().on(‘error’, sass.logError)) .pipe(gulp.dest(‘app/css’)); });

//Convert sass files to .css
function css() {
    return src('src/scss/main.scss')
        .pipe(sass())
        //minify css
        //.pipe(minifyCSS())
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
