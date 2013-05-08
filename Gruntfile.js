module.exports = function(grunt) {

  var RE_USE_STRICT_STATEMENT = /(^|\n)[ \t]*('use strict'|"use strict");?\s*/g,
      RE_CONSOLE_METHODS      = /console.[\w]+\(.*?(\w*\(.*\))*\);/g,
      BANNER_TEMPLATE_STRING  = '/*! <%= pkg.name %> - v<%= pkg.version %> ( <%= grunt.template.today("yyyy-mm-dd") %> ) - <%= pkg.license %> */',
      BUILD_ORDERED_LIST      = [
        'src/helper.js',
        'src/view.js',
        'src/model.js',
        'src/collection.js',
        'src/layout.js',
        'src/component.js',
        'src/export.js'
      ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: [BANNER_TEMPLATE_STRING,
                 '(function(window) {',
                 '',
                 '"use strict";',
                 '',
                 ''].join('\n'),
        footer: ['',
                 '})(this);'].join('\n')
      },
      dist: {
        src: BUILD_ORDERED_LIST,
        dest: 'dist/phalanx.js',
        options: {
          process: function(content) {
            return content.replace(RE_USE_STRICT_STATEMENT, '$1').replace(RE_CONSOLE_METHODS, '');
          }
        }
      },
      debug: {
        src: BUILD_ORDERED_LIST,
        dest: 'dist/phalanx.debug.js',
        options: {
          process: function(content) {
            return content.replace(RE_USE_STRICT_STATEMENT, '$1');
          }
        }
      }
    },
    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/phalanx.min.js': ['dist/phalanx.js']
        }
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['concat:debug'],
      options: {
        nospawn: false,
        interrupt: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build',   ['concat', 'uglify']);
  grunt.registerTask('devel',   ['watch']);

};
