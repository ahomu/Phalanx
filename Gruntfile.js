module.exports = function(grunt) {
  'use strict';

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
        src: ['dist/phalanx.js'],
        dest: 'dist/phalanx.min.js'
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['concat:debug'],
      options: {
        nospawn: false,
        interrupt: true
      }
    },
    jsduck: {
      options: {
        'builtin-classes': false,
        // @see https://github.com/senchalabs/jsduck/blob/master/lib/jsduck/logger.rb
        'warnings': ['-no_doc', '-dup_member', '-link_ambiguous', '-type_name'],
        'external': ['XMLHttpRequest']
      },
      dist: {
        src: ['dist/phalanx.debug.js'],
        dest: 'docs'
      }
    },
    plato: {
      options: {
        jshint : grunt.file.readJSON('.jshintrc')
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'reports'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsduck');
  grunt.loadNpmTasks('grunt-plato');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build',   ['concat', 'uglify', 'jsduck', 'plato']);
  grunt.registerTask('devel',   ['watch']);

};
