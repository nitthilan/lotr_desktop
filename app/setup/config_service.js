angular.module('lotr_desktop')
    .service('config_service', ['$log', function($log){

    var that = this;
    that.mode = "production";

    // Initialise all the required data empty
    // notebook list
    that.init = function(mode){
        // mode could be - development, test, production
        that.mode = mode;
        $log.info("Running in mode "+that.mode);
    };
    that.config = {
        development: {
            tag: "development",
            server_address: "http://localhost:3000/",
            db_base_path: "db/devel/",
            root: require('path').normalize(process.cwd() + "/app")+"/",
        },
        test: {
            tag: "test",
            server_address: "http://localhost:3000/",
        },
        production: {
            tag: "production",
            server_address: "http://localhost:3000/",
        }
    };
    that.get = function(){
        return that.config[that.mode];
    };
}]);
