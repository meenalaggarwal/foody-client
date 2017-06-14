var pkg = require('./package.json');
var bowerjson = require('./bower.json');

var dist = "dist/";
var source = "src/";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["dist", '.tmp'],

    copy: {
      main: {
        expand: true,
        cwd: '',
        src: ['app/**', 'scripts/web-server.js', '!app/lib/**', '!app/modules/**/*.js', '!app/js/**', '!app/css/**'],
        dest: 'dist/'
      }
    },

    useminPrepare: {
      html: 'app/index.html'
    },

    usemin: {
      html: ['dist/app/index.html']
    },

    uglify: {
      options: {
        report: 'min',
        mangle: true
      }
    }
  });

  //Load grunt Tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');

  //Default grunt task
  grunt.registerTask('default', [
  'clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin',
  'usemin', 'adjustBuiltLinks'
  ]);

  //This task is meant for DEVELOPMENT (Not to be used in Production)
  grunt.registerTask('serve', function (target) {
    process.env.APP_ENVIRONMENT = 'local';
    /****
     * compressed mode
     * No watches in this mode. If any file changes, we need to 
     * manually rebuild and restart the server.
     **/
    if (target === 'compress') {
      process.env.DLS_UNCOMPRESSED_MODE = false;
      grunt.task.run([
                'build',
                'express:compress',
                'express-keepalive'
            ]);
    }
    /****
     * uncompressed mode
     * Watches for changes in src/server, node_modules/module_app_base
     * folders. If any file changes, restarts the server automatically.
     **/
    process.env.DLS_UNCOMPRESSED_MODE = true;
    grunt.task.run([
            'clean:bower',
            'bower:install',
            'express:uncompress',
            'watch'
        ]);
  });

  //Task to run app on heroku servers
  grunt.registerTask('heroku', 'Runs the app in the compressed/uncompressed mode based on env variable', function () {
    var build_mode = process.env.DLS_UNCOMPRESSED_MODE;
    if (!build_mode) {
      grunt.task.run([
                'express:compress',
                'express-keepalive'
            ]);
    } else {
      grunt.task.run([
                'express:uncompress',
                'express-keepalive'
            ]);
    }
  });

  grunt.registerTask('default', ['build']);

};