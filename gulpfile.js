var	gulp			= require('gulp'),
	browserSync	= require('browser-sync'),
	prefix			= require('gulp-autoprefixer'),
	cache				= require('gulp-cache'),
	concat			= require('gulp-concat'),
	imageop			= require('gulp-image-optimization'),
	jade				= require('gulp-jade'),
	jshint			= require('gulp-jshint'),
	jshStylish	= require('jshint-stylish'),
	minifycss		= require('gulp-minify-css'),
	plumber			= require('gulp-plumber'),
	rename			= require('gulp-rename'),
	sass				= require('gulp-sass'),
	destFolder			= '../',
	uglify			= require('gulp-uglify');


// Serve the files from the build folder
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: [destFolder + "build/"]
		},
		notify: false
	});
});

// Reload browser
gulp.task('bs-reload', function() {
	return browserSync.reload();
});

// Copy images to build folder
gulp.task('images', function() {
	return gulp.src('assets/images/**/*')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(destFolder + 'build/assets/images/'));
    gulp.src('build/assets/images/**/*')
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(destFolder + 'build/assets/images'));
});

// Process Jade files to HTML
gulp.task('jade', function() {
	return gulp.src('jade/*.jade')
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(jade({
		'pretty': true
	}))
	.pipe(gulp.dest(destFolder + 'build/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Process Sass (and Scss?) to CSS
gulp.task('styles', function() {
	return gulp.src('assets/css/*.sass')
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(sass({
		indentedSyntax: true
	}))
	.pipe(prefix({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(destFolder + 'build/assets/css/'))
	.pipe(browserSync.reload({ stream: true }));
});

// Process JavaScript files
gulp.task('js', function() {
	gulp.src(['!' + 'assets/js/vendor/*.js', 'assets/js/**/*.js'])
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.js'))
	.pipe(gulp.dest(destFolder + 'build/assets/js/'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(uglify())
	.pipe(gulp.dest(destFolder + 'build/assets/js/'))
	.pipe(browserSync.reload({
		stream: true
	}));
	gulp.src('assets/js/vendor/*.js')
	.pipe(gulp.dest(destFolder + 'build/assets/js/vendor/'));
});

// Build the project
gulp.task('build', ['styles', 'jade', 'js', 'images']);

// Watch files for changes
gulp.task('watch', function() {
	// Watch for styles changes and compile
	gulp.watch(['assets/css/**/*.sass', 'assets/css/**/*.scss'], ['styles']);
	// Watch for images and optimize them
	gulp.watch('assets/images/**/*', ['images']);
	// Watch for JavaScript changes and compile
	gulp.watch('assets/js/**/*.js', ['js']);
	// Watch for jade changes and compile
	gulp.watch('jade/**/*.jade', ['jade']);
})

// Compile, Serve and Watch
gulp.task('default', ['build', 'watch', 'bs-reload', 'browser-sync']);

// Serve and watch
gulp.task('serve', ['watch', 'bs-reload', 'browser-sync']);
