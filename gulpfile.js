var gulp        = require('gulp'),
    livereload  = require('gulp-livereload'),
    sass        = require('gulp-sass'),
    connect     = require('gulp-connect'),
    exec        = require('child_process').exec;

var paths = {
  'src' : {
    'scss' : './scss/app.scss'
  },
  'dist' : {
    'scss' : './html/'
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
  exec('kss -c ./scss/kss.json', function(err, out, stderr) {})
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
  gulp.watch('./scss/**/*', ['dev']);
})

gulp.task('default', ['connect', 'watch'], () => {});
