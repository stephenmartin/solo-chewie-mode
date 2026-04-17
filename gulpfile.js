const {series, parallel, watch, src, dest} = require('gulp');
const pump = require('pump');
const fs = require('fs');
const order = require('ordered-read-streams');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const zip = require('gulp-zip');

// postcss plugins
const easyimport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss([
            easyimport,
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function getJsFiles(version) {
    const jsFiles = [
        src(`node_modules/@tryghost/shared-theme-assets/assets/js/${version}/lib/**/*.js`),
        src(`node_modules/@tryghost/shared-theme-assets/assets/js/${version}/main.js`),
    ];

    if (fs.existsSync(`assets/js/lib`)) {
        jsFiles.push(src(`assets/js/lib/*.js`));
    }

    jsFiles.push(src(`assets/js/main.js`));

    return jsFiles;
}

function js(done) {
    pump([
        order(getJsFiles('v1'), {sourcemaps: true}),
        concat('main.min.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function landingCss(done) {
    const landingDir = 'landings';
    if (!fs.existsSync(landingDir)) { return done(); }

    pump([
        src('landings/*/*.css', {sourcemaps: true}),
        postcss([
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/landings/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function landingJs(done) {
    const landingDir = 'landings';
    if (!fs.existsSync(landingDir)) { return done(); }

    pump([
        src('landings/*/*.js', {sourcemaps: true}),
        uglify(),
        dest('assets/built/landings/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log'
        ]),
        zip(filename, {compress: false}),
        dest('dist/')
    ], handleError(done));
}

const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsWatcher = () => watch('assets/js/**/*.js', js);
const landingCssWatcher = () => watch('landings/**/*.css', landingCss);
const landingJsWatcher = () => watch('landings/**/*.js', landingJs);
const watcher = parallel(hbsWatcher, cssWatcher, jsWatcher, landingCssWatcher, landingJsWatcher);
const build = parallel(series(css, js), series(landingCss, landingJs));

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
