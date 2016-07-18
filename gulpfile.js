var gulp        = require('gulp'),
    livereload  = require('gulp-livereload'),
    sass        = require('gulp-sass'),
    connect     = require('gulp-connect'),
    exec        = require('child_process').exec;

var paths = {
  'src' : {
    'kss'  : './src/scss/**/*.scss',
    'scss' : './src/scss/app.scss',
    'meta' : './src/_meta/**/*'
  },
  'dist' : {
    'scss' : './dist/',
    'meta' : './dist/_meta'
  }
};

gulp.task('connect', () => {
  connect.server({
    root: "./",
    livereload: true,
    port: 8002
  })
})

gulp.task('docs', () => {

  gulp.src(paths.src.meta)
    .pipe(gulp.dest(paths.dist.meta))

  exec('kss --homepage "'+__dirname+'/src/_meta/_styleguide-home.md" -c ./kss.json', function(err, out, stderr) {
    console.log(__dirname);
    console.log(out);
  })

})

gulp.task('scss', () => {
  gulp.src(paths.src.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.dist.scss))
})

gulp.task('dev', ['docs', 'scss'], () => {
  gulp.src(paths.src.scss)
      .pipe(connect.reload())
})

gulp.task('watch', () => {
  gulp.watch('./src/**/*', ['dev']);
})

gulp.task('build', ['dev'], () => {})

gulp.task('default', ['connect', 'watch'], () => {});
