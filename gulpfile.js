const sourcemaps = require('gulp-sourcemaps')
    , mergeStream = require('merge-stream')
    , cssImport = require('gulp-cssimport')
    , styledown = require('gulp-styledown')
    , stylelint = require('gulp-stylelint')
    , cssnext = require('postcss-cssnext')
    , cssnano = require('gulp-cssnano')
    , postcss = require('gulp-postcss')
    , rename = require('gulp-rename')
    , clone = require('gulp-clone')
    , watch = require('gulp-watch')
    , size = require('gulp-size')
    , gulp = require('gulp')
    , del = require('del')
    , cssvariables = require('postcss-css-variables')
;

/**
 * Error handling
 * @param Error err
 */
const handleError = function (err) {
    console.log(
        'FATAL ERROR OCCURRED: ', err.message,
        (err.fileName ? '\nFile:' + err.fileName : ''),
        (err.lineNumber ? '\nLine:' + err.lineNumber : '')
    );
    process.exit(1);
};

/**
 * Source file
 * @type {string}
 */
const srcFile = './src/brew.css';

/**
 * Destination path
 * @type {string}
 */
const outPath = './dist';

/**
 * Path to source maps (relative to outPath)
 * @type {string}
 */
const mapPath = './';

/**
 * Default task
 */
gulp.task('default', ['build']);

/**
 * Delete last CSS build
 */
gulp.task('clean', () => {
    return del(['dist/*', '!.gitkeep']);
});

/**
 * Build BREW Styleguide
 */
gulp.task('docs', ['build'], () => {

    // Build docs via styledown
    const docs = gulp.src(['./src/brew.css'])
        .pipe(cssImport())
        .pipe(styledown({
            filename: 'index.html',
            config: './docs/_docs.css',
            indentSize: 4
        }))
        .on('error', handleError)
        .pipe(gulp.dest('./docs'))
    ;

    // Copy latest build to docs
    const dist = gulp.src('./dist/brew.css*', { base: '.' })
        .pipe(gulp.dest('./docs'))
    ;

    // Merge and return both streams
    return mergeStream(docs, dist);

});

/**
 * Lint BREW Stylesheets
 */
gulp.task('lint', () => {
    return gulp.src('./src/**/*.css')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'verbose', console: true }
            ]
        }))
    ;
});

/**
 * Build BREW Stylesheet
 */
gulp.task('build', ['clean'], () => {

    // PostCSS plugins
    const plugins = [
        require('postcss-import')(),
        require('css-mqpacker')(),
        cssnext({
            browsers: 'last 2 versions',
            features: {
                customProperties: {
                    warnings: false
                }
            }
        }),
        require('postcss-reporter')(),
        require('postcss-css-variables')(),
    ];

    // BREW stylesheet
    const source = gulp.src(srcFile)
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins));

    // Save uncompressed styles
    const build = source.pipe(clone())
        .pipe(sourcemaps.write(mapPath))
        .pipe(size({ title: 'Build' }))
        .pipe(gulp.dest(outPath));

    // Save minified stylesheet
    const minify = source.pipe(clone())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano({ autoprefixer: false }))
        .pipe(size({ title: 'Minify' }))
        .pipe(sourcemaps.write(mapPath))
        .pipe(gulp.dest(outPath));

    // Merge and return both streams
    return mergeStream(build, minify);

});

/**
 * Watch for CSS changes & rebuild
 */
gulp.task('watch', () => {
    gulp.watch('./src/**/*', ['build', 'docs']);
});
