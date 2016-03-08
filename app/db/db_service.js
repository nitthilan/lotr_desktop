angular.module('lotr_desktop')
    .service('db_service', ['config_service', '$log', function(config_service, $log){

    var that = this;
    var config = config_service.get();
	var Datastore = require('nedb')
    
    function get_db_file_path(db_name){
    	var db_path = config.root + config.db_base_path + db_name;
    	var db = new Datastore({ filename: db_path, autoload: true });
    	//$log.info("Path to the user db "+db_path);
    	return db;
    }
    //var user_profile_db = get_db_file_path("user_profile");
    // Used to store remember me info, device name and id
    var remember_me_db = get_db_file_path("remember_me");
    // user id, device id
    var device_id_db = get_db_file_path("device_id");


    that.get_remember_me = function(){
    	return remember_me_db;
    }
    that.get_device_id = function(){
        return device_id_db;
    }
}]);