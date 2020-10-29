module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                //난독화 대상 코드의 경로 및 이름
                src: 'grid.js', 
                //난독화된 코드가 저장될 경로 및 이름
                dest: 'grid_uglified.js' 
            }
        }

    });

    //로딩
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //실행작업
    grunt.registerTask('default', ['uglify']);
}