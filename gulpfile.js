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

//move javascript
function js() {
    return src('app/js/*.js', { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: true }))
}

//browser reload on ANY file change
function watchFiles() {
     browserSync.init({
         watch: true,
         files: ['./app/**/*'],
         server: "./app"
     });
}

exports.default = function () {
   watch('app/scss/*.scss', css);
   watch('app/*.html', html);
   watch('app/**/**.js', js);
   watch('app/images/**', images);
   images();
   watchFiles();
}



