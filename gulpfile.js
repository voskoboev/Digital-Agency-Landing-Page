const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const del = require('del')

const browsersync = () => {
  browserSync.init({
    server: { baseDir: 'src/' },
    notify: false,
    online: false
  })
}

const scripts = () => {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'src/js/index.js'
  ])
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js/'))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src([
    'node_modules/reset-css/reset.css',
    'node_modules/slick-carousel/slick/slick.css',
    'src/scss/bundle.scss'
  ])
    .pipe(sass())
    .pipe(concat('bundle.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss(({ level: { 1: { specialComments: 0 } } })))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream())
}

const images = () => {
  return src('src/images/**/*') // src/
    .pipe(newer('src/images/')) // dest/
    .pipe(imagemin())
    .pipe(dest('src/images/')) // dest/
}

const cleanimg = () => {
  return del('src/images/**/*', { force: true }) // dest/
}

const fonts = () => {
  return src('src/fonts/**/*')
    .pipe(dest('src/fonts/'))
}

const videos = () => {
  return src('src/videos/**/*')
    .pipe(dest('src/videos/'))
}

const cleandist = () => {
  return del('dist/**/*', { force: true })
}

const buildcopy = () => {
  return src([
    'src/css/**/*.min.css',
    'src/js/**/*.min.js',
    'src/images/**/*', // dest/
    'src/fonts/**/*', // dest/
    'src/videos/**/*', // dest/
    'src/**/*.html'
  ],
  { base: 'src/' })
    .pipe(dest('dist'))
}

const startWatch = () => {
  watch('src/**/*.html').on('change', browserSync.reload)
  watch('src/**/*.scss', styles)
  watch(['src/**/*.js', '!src/**/*.min.js'], scripts)
  watch('src/images/**/*', images)
  watch('src/fonts/**/*', images)
}

exports.browsersync = browsersync
exports.scripts = scripts
exports.styles = styles
exports.images = images
exports.fonts = fonts
exports.videos = videos
exports.cleanimg = cleanimg
exports.cleandist = cleandist

exports.build = series(cleandist, styles, scripts, images, fonts, videos, buildcopy)
exports.default = parallel(styles, scripts, browsersync, startWatch)
