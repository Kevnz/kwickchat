module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                  {src: ['img/*'], dest: 'public/', filter: 'isFile'}, // includes files in path
                ]
            }
        },
        watch: {
            files: ['frontend/js/*', 'frontend/js/**.js','frontend/sass/*.scss', 'app.js','lib/*','routes/**.js', 'views/*.handlebars'],
            tasks: [ 'jshint','sass', 'copy'],
            options: {
                livereload: true,
            }
        },
        jshint: {
            options: {
                expr: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    YUI: true,
                    console: true,
                    exports: true,
                    require: true,
                    process: true,
                    __dirname: true
                },
 
                    ignores: ['public/js/lib/*.js']
            
            },
            lib_test: {
                src: ['frontend/js/**.js','lib/*.js', 'routes/*.js', 'app.js']
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['frontend/sass/'],
                    outputStyle: 'nested'
                },
                files: {
                    'public/css/style.css': 'frontend/sass/style.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-yui-config');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('directory', 'Created required folders for build.', function() {
        var fs = require('fs');
        fs.exists('public/js', function (exists) {
            if(!exists) {
                fs.mkdirSync('public/js');
                fs.mkdirSync('public/js/vendor');
            }
        });
    });
    grunt.registerTask('default',  ['jshint','directory','sass', 'copy']);
};
