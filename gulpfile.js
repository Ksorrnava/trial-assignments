// Include gulp
var gulp = require('gulp'),
  // Include Our Plugins
  less = require('gulp-less'),
  spritesmith = require('gulp.spritesmith'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');
  browserSync = require('browser-sync');

gulp.task('css', function () {
  gulp
    .src('./less/main.less')
    .pipe(less({ strictMath: false }))
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'IE 9', 'IE 10']})
    ]))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function(){
  gulp.src('./*.html')
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/spritesrc/*.png').pipe(spritesmith({
    imgName: './images/sprite.png',
    cssName: './less/_sprite.less'
  }));
  return spriteData.pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch('./less/**/*.less', ['css']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['sprite', 'watch', 'browserSync']);
