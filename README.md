Frontend task runner
====================

There are a number of repeating tasks in frontend development, namely

- transpiling (ES6 > ES5)
- compiling (Sass / Less > JS)
- concatenating (CSS + JS)
- annotating (Angular)
- minifying (CSS + JS)
- packaging (browserify)
- image optimization
- hinting / linting / code style checker (JS)

These tasks can be done manually or by employing a task runner (automatically). There are a number of task runner(s), namely GULP and Grunt. I personally found Gulp to be much faster than Grunt, which can be due to the fact, that Gulp uses pipes.

These task runner(s) can be installed via npm (node package manager).

1) Grunt

Install :

    npm install grunt grunt-cli --save-dev

    // -g installs it globally

We need to put a *Gruntfile.js* into the ROOT folder which could look like this :

    module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'javascript/**/*.js'],
            options: {
                globals: {
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);

};

For the Grunt task runner to work we will need to install the following two packages :

    npm install grunt-contrib-jshint grunt-contrib-watch --save-dev
    // -g installs them globally

We can easily add other tasks by
- installing the respective module via npm
- loading the task in the *Gruntfile.js* [using *grunt.loadNpmTasks('task-name')*]
- adding them to the *Gruntfile.js*

2) Gulp
=======

Similarly to Grunt we need to install gulp via npm:

    npm install gulp --save-dev
    // -g installs it globally

and create a *gulpfile.js* in the project ROOT (which could look like this) :

    var gulp = require('gulp'),
    sass = require('gulp-sass');
    gulp.task('sass', function(done) {
        gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css/'))
        //.pipe(minifyCss({
        //    keepSpecialComments: 0
        //}))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
	});

In order to run the *sass* task, we need the install the respective module :

    npm install gulp-sass --save-dev
    // -g installs it globally

For demonstration purposes we setup up Gulp to run just one task : compiling SASS into CSS. It reads the SASS source file [scss/main.scss] (which imports a number of other SASS files) and compiles into CSS [dist/css/main.css].

Further tasks can be setup by (not necessarily in that order)
- installing the respective module via npm
- requiring the module in the *gulpfile.js*
- setting up the task in the *gulpfile.js*

Lets say we want our *Angular* source files to be annotated we add the ng-annotate task :

1) Install the module

	npm install gulp-ng-annotate --save-dev

    // -g installs it globally

2) Require the module in the gulpfile.js

    var ngAnnotate = require('gulp-ng-annotate');

3) Setup the task

    gulp.task('annotate', function () {
	    gulp.src('javascript/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/js'))
	});


You can also get a task to wait for another task to finish by passing an array of task **dependencies** into the task like so :

	gulp.task('annotate', ['another-task'], function () { });

This would cause the task *annotate* to wait for task *another-task* to finish.

Tasks can be **grouped** like so :

	gulp.task('build', ['mincss', 'minjs']);

The task 'build' will run tasks *mincss* and *minjs*. Using Gulp these tasks might not finish in that order (using Grunt they would).

3) npm
------

To install Grunt or Gulp we already have npm (node package manager) installed. We could also use npm to run tasks for us.

In the package.json, which should be in the ROOT folder (if not, please run : *npm init*) we simply add a node command to the *script* property :

	//...package.json
    "scripts": {
	    "build-sass": "node-sass scss/main.scss dist/css1/main.css"
	}

It requires us to install *node-sass* by running :

    npm install node-sass --save-dev

    // -g installs it globally

Then we run

	npm run build-sass

which will then create a file *main.css* in folder *dist/css1/*.

We could then minify the CSS using the *cssmin* module. The following steps are necessary :

1) install cssmin via npm

    npm install cssmin --save-dev

    // -g installs it globally

2) setup the script in the package.json

	"scripts": {
        "build-sass": "node-sass scss/main.scss dist/css1/main.css",
        "cssmin": "cssmin dist/css/main.css > dist/css/main.min.css"
    }

3) run the script

	npm run cssmin

This task will read the main.css in folder dist/css/main.css and saves the *minified* CSS into dist/css/main.min.css.

Pros and Cons using Task runner
-------------------------------

Pros :
- takes away tasks
- automates tasks
- reduces human errors
- fast & reliable

Cons:
- updates can cause problems
- takes some time to setup

Github repo : https://github.com/marek1/task-runner-demonstration.git