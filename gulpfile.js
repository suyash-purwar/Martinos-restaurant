const { src, dest, series, watch } = require("gulp")
const sass = require("gulp-sass");
const browsersync = require("browser-sync");

const sendHtml = () => {
    return src("src/**/*.html")
        .pipe(dest("dist/"));
};

const sendAssets = () => {
    return src("src/assets/**/*")
        .pipe(dest("dist/assets/"));
};

const compileSass = () => {
    return src("src/sass/*.scss")
        .pipe(sass())
        .pipe(dest("dist/css/"));
};

const browswesyncServe = cb => {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    });

    cb();
};

const browsersyncReload = cb => {
    browsersync.reload();
    cb();
};

const watchTask = () => {
    watch('src/**/*.html', series(sendHtml, browsersyncReload));
    watch('src/sass/**/*.scss', series(compileSass, browsersyncReload));
    watch('src/assets/**/*.png', series(sendAssets, browsersyncReload));
};

exports.default = series(
    sendHtml,
    sendAssets,
    compileSass,
    browswesyncServe,
    watchTask
);