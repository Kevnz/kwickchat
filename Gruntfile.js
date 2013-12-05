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
        yuiConfig: {
            losing: {
                options: {
                    dest: 'public/yui_config.js',
                    root: '/yui/build/',
                    combine: true, 
                    comboBase: 'http://localhost:3000/combo?', 
                    groups: {
                        losingApp: {
                            combine: true,  
                            root: '',
                            modules: ['public/js/**.js'],
                            processPath: function (p) {
                                return p.replace('public', '');
                            },
                            excludeFiles: ['public/js/lib/**.js']
                        }
                    }
                }
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
    grunt.registerTask('default',  ['jshint', 'copy']);
};
