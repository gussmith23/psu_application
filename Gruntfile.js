module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    name: "config/Init",
                    mainConfigFile: 'public/js/app/config/Init.js',
                    baseUrl: "public/js/app",
                    removeCombined: true,
                    wrapShim: true,
                    findNestedDependencies: true,
                    out: "public/js/r_app.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['requirejs']);

};