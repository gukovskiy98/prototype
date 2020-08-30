const gulp = require("gulp"),
  prefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-terser"),
  sass = require("gulp-sass"),
  imagemin = require("gulp-imagemin"),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  webp = require("gulp-webp"),
  webpHtml = require("gulp-webp-html"),
  webpCss = require("gulp-webpcss"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fileInclude = require("gulp-file-include"),
  del = require("del"),
  plumber = require("gulp-plumber"),
  concat = require("gulp-concat");

const path = {
  build: {
    html: "build/",
    css: "build/css/",
    js: "build/js/",
    img: "build/images/",
    fonts: "build/fonts/",
  },
  src: {
    html: "src/*.html",
    css: "src/scss/style.scss",
    js: ["src/js/webptest.js", "src/js/index.js"],
    img: "src/images/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  watch: {
    html: "src/**/*.html",
    css: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    img: "src/images/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./build/",
  lightClean: [
    "./build/**/*.*",
    "!./build/images/**/*.*",
    "!./build/fonts/**/*.*",
  ],
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
    port: 9876,
    notify: false,
    online: false,
  });
}

function html() {
  return gulp
    .src(path.src.html)
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return gulp
    .src(path.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: false,
        grid: true,
      })
    )
    .pipe(
      webpCss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return gulp
    .src(path.src.js)
    .pipe(plumber())
    .pipe(concat("index.js", {newLine: ";"}))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.img))
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp
    .src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(gulp.src(path.src.fonts))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
}

function clean() {
  return del(path.clean);
}

function lightClean() {
  return del(path.lightClean);
}

function watchFiles() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, images);
  gulp.watch(path.watch.fonts, fonts);
}

const start = gulp.parallel(
  gulp.series(clean, gulp.parallel(html, css, js, images, fonts)),
  watchFiles,
  browsersync
);

// quickStart - not refreshing images and fonts
const quickStart = gulp.parallel(
  gulp.series(lightClean, gulp.parallel(html, css, js)),
  watchFiles,
  browsersync
);

exports.html = html;
exports.clean = clean;
exports.lightClean = lightClean;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.start = start;
exports.quickStart = quickStart;
exports.default = start;
