module.exports = function(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'build/slanted-responsive-images.js': 'src/slanted-responsive-images.js'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/slanted-responsive-images.js': ['build/slanted-responsive-images.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
