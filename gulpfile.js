const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');
const livereload = require('gulp-livereload');
//1. Compile HTML file and move them to the app folder
gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

//2. Compile CSS file and move them to the app folder
gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

//3. Compile JS and JSX files and move them to the app folder
gulp.task('js*', () => {
    return gulp.src(['main*.js', 'src/**/*.js*'])
         .pipe(babel())
         .pipe(gulp.dest('app/'))
         .pipe(livereload());
});

//4. Compile IMAGES file and move them to the app folder
// ------------------------------------------------------------------------------------ All images inside ./assets/
gulp.task('images', () => {
    return gulp.src('src/assets/*')
         .pipe(gulp.dest('app/assets'))
         .pipe(livereload());
})

//5. Watch files
gulp.task('watch', async function() {
  livereload.listen();
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('css'));
  gulp.watch('src/**/*.js*', gulp.series('js*'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
});

//6. Send to app folder
gulp.task('build', gulp.series('html', 'css', 'js*', 'images'));

//7. Start the electron process.
gulp.task('start', gulp.series('build', () => {
    return exec(
        __dirname+'/node_modules/.bin/electron .'
    ).on('close', () => process.exit());
}));

//0. Default process.
gulp.task('default', gulp.parallel('start', 'watch'));
