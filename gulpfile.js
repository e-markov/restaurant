var gulp          = require('gulp'),              // Подключение Gulp к проекту, посредством функции require
    pug           = require('gulp-pug'),          // Подключение Pug
    sass          = require('gulp-sass'),         // Подключение Sass
    browserSync   = require('browser-sync'),      // Подключение Browser Sync
    concat        = require('gulp-concat'),       // Подключение Concat - объединение JS файлов
    uglify        = require('gulp-uglifyjs'),     // Подключение Uglify - как сборка и минификация CSS- и JS-файлов
    cssnano       = require('gulp-cssnano'),      // Подключение CSSnano - сжатие
    rename        = require('gulp-rename'),       // Подключение Rename
    del           = require('del'),               // Подключение Del
    autoprefixer  = require('gulp-autoprefixer'), // Подключение AutoPrefixer
    imagemin      = require('gulp-imagemin');     // Подключение ImageMin - сжатие изображений

gulp.task('pug', function () {         // Запуска задачи (task) для pug
  return gulp.src('sourse/pug/*.pug')  // Выборка PUG файлов
    .pipe(pug({pretty: true}))         // Вызов Gulp плагина для обработки файла
    .pipe(gulp.dest('sourse'))         // Вывод результирующего файла в папку
    .pipe(browserSync.stream());       // Синхронизация с браузером
});

gulp.task('sass', function () {             // Запуск задачи
  return gulp.src('sourse/sass/**/*.sass')  // Выбор SASS файлов
    .pipe(sass())                           // Вызов плагина sass
    .pipe(autoprefixer(                     // Вызов плагина autoprefixer
      {browsers: ['last 4 versions', 'ie 8', 'ie 7'], cascade: true}))
    .pipe(cssnano())                        // Сжатие
    .pipe(rename({suffix: '.min'}))         // Добавение прецикса - min
    .pipe(gulp.dest('sourse/css'))          // Выгрузка в папку
    .pipe(browserSync.stream());            // Синхронизация с браузером
});

gulp.task('js', function() {                  // Запуск задачи
  return gulp.src('sourse/js/component/*.js') // Выбор JS файлов
    .pipe(concat('main.min.js'))              // Сборка всех выбранных JS файлов в один
    .pipe(uglify())                           // Сжатие JS
    .pipe(gulp.dest('sourse/js'))             // Выгрузка в папку
    //.pipe(browserSync.stream());              // Синхронизация с браузером
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({                         // Выполняем browser-sync
    server: {                           // Определяем параметры сервера
      baseDir: 'sourse'                 // Директория для сервера - sourse
    },
    notify: false                       // Отключаем уведомления
  });
});

gulp.task('watch', function () {
  gulp.watch('sourse/pug/**/*.pug', gulp.parallel('pug'));     // Наблюдение за pug файлами
  gulp.watch('sourse/sass/**/*.sass', gulp.parallel('sass'));  // Наблюдение за sass файлами
  //gulp.watch('sourse/js/**/*.js', gulp.parallel('js'));        // Наблюдение за js файлами
});

gulp.task('image', function() {             // Запуск задачи
  return gulp.src('sourse/img/*')           // Выбор изображений
    .pipe(imagemin())                       // Сжатие изображений
    .pipe(gulp.dest('sourse/img/img-min'))  // Выгрузка в папку
});

gulp.task('clean', function() {   // Очистка папки dist
  return del.sync('dist/*');
});

gulp.task('clear', function () {  // Очистка кэша
  return cache.clearAll();
});

gulp.task('build', function() {             // Сборка проекта в dist
  var buildHtml = gulp.src('sourse/*.html')
    .pipe(gulp.dest('dist'))
  var buildCss = gulp.src('sourse/css/*.css')
    .pipe(gulp.dest('dist/css'))
  var buildCss = gulp.src('sourse/js/*.js')
    .pipe(gulp.dest('dist/js'))
  var buildImg = gulp.src('sourse/img/img-min/*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('default', gulp.parallel('pug', 'sass', 'js', 'watch', 'browser-sync'));