module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        // compile sass
        sass: {
            options: {
                    style: 'compressed'
                    //lineNumbers: true
            },
            dist: {
                files: {
                    'dev/assets/css/default.noprefix.css': 'dev/assets/sass/default.sass', // 'destination': 'source'
                    'dev/assets/css/smart.noprefix.css': 'dev/assets/sass/smart.sass', // 'destination': 'source'
                }
            }
        },

        // add vendor-specific prefixes from Can I Use
        autoprefixer: {
            options: {
                browsers: ["ie 9", "last 2 versions"]
            },
            default: {
                src: "dev/assets/css/default.noprefix.css",
                dest: "site/assets/css/default.css"
            },
            smart:{
                src: "dev/assets/css/smart.noprefix.css",
                dest: "site/assets/css/smart.css"
            }
        },

        // copy assets
        copy: {
            js_to_frontend: {
                cwd: "dev/assets/js",
                src: "**",
                expand: true,
                dest: "site/assets/js",
                flatten: false
            }            
        },

        // create retina & non-retina sprite sheets
        css_sprite: {
            options: {
                cssPath: "../img/", // checked
                orientation: "binary-tree",
                processor: "sass",
                margin: 4,
                interpolation: "linear",
                retina: true
            },
            global: {
                options: {
                    style: "dev/assets/sass/_sprites/sprite.sass",
                    prefix: "icon"

                },
                src: ["dev/assets/sprite/*"],
                dest: ["site/assets/img/sprite"]
            }
        },

        // compile handlebars
        "compile-handlebars": {
            globbedTemplateAndOutput: {
                template: 'dev/templates/*.html',
                templateData: 'dev/templates/**/**/*.json',
                output: 'site/*.html',
                partials: 'dev/templates/partials/**/*.html'
            }
        },

        // watch
        watch: {
            options: { livereload: true },
            css: {
                files: ["dev/assets/sass/**/*", "dev/templates/**/*", "dev/assets/sprite/**/*"],
                tasks: ["css_sprite", "sass", "autoprefixer", "compile-handlebars"]
            },
            js: {
                files: ["dev/assets/js/**/*"],
                tasks: ["copy:js_to_frontend"]
            },
            php: {
                files: ["dev/php/**/*"],
                tasks: ["copy:php_to_frontend"]
            }
        },

        // configure live reload
        livereload  : {
            options   : {
                base    : 'site',
            },
            files     : ['site/**/*']
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require("matchdep").filterDev("css-sprite").forEach(grunt.loadNpmTasks);
    grunt.registerTask("default",["production"]);
    grunt.registerTask("production", ["copy", "css_sprite", "sass", "autoprefixer", "compile-handlebars", "watch", "livereload"]);
};