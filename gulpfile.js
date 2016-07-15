var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    exec = require('child_process').exec;

gulp.task('docs', function() {
  exec('kss -c ./scss/kss.json', function(err, out, stderr) {})

  gulp.src('./scss/**/*')
      .pipe(livereload())
});

gulp.task('watch', function(){
  livereload.listen()
  gulp.watch('./scss/**/*', ['docs']);
})
