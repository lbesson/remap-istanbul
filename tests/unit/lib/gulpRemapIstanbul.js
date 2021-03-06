define([
	'intern!object',
	'intern/chai!assert',
	'intern/dojo/node!gulp',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../../lib/gulpRemapIstanbul'
], function (registerSuite, assert, gulp, fs, remapIstanbul) {
	registerSuite({
		name: 'lib/gulpRemapIstanbul',

		'remap coverage': function () {
			var dfd = this.async();
			gulp.task('remap-istanbul', function () {
				return gulp.src('tests/unit/support/coverage.json')
					.pipe(remapIstanbul())
					.pipe(gulp.dest('tmp/gulp'));
			});

			gulp.task('assertions', [ 'remap-istanbul' ], dfd.callback(function () {
				assert.isTrue(fs.existsSync('tmp/gulp/coverage.json'));
			}));

			gulp.start('assertions');
		},

		'write reports': function () {
			var dfd = this.async();

			gulp.task('remap-istanbul', function () {
				return gulp.src('tests/unit/support/coverage.json')
					.pipe(remapIstanbul({
						reports: {
							'lcovonly': 'tmp/gulp/lcov.info',
							'html': 'tmp/gulp/html-report',
							'json': 'tmp/gulp/gulp-coverage.json'
						}
					}));
			});

			gulp.task('assertions', [ 'remap-istanbul' ], dfd.callback(function () {
				assert.isTrue(fs.existsSync('tmp/gulp/gulp-coverage.json'));
				assert.isTrue(fs.existsSync('tmp/gulp/lcov.info'));
				assert.isTrue(fs.existsSync('tmp/gulp/html-report'));
			}));

			gulp.start('assertions');
		}
	});
});
