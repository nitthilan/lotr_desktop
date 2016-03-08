angular.module('lotr_desktop')
    .service('external_server_client_service', ['config_service', '$log', 'remember_me_service', 'user_profile_service',
        function(config_service, $log, remember_me_service, user_profile_service){

    var that = this;

    that.connect = function(callback){
        if(that.socket) {
            that.socket.disconnect();
            that.socket = null;
        }

    	var config = config_service.get();
    	var options = {
    		/*reconnection: true,
    		reconnectionDelay: 1000,
    		reconnectionDelayMax: 5000,
    		timeout: 20000,*/
            //forceNew: true,
            multiplex: false
    	}
    	var socket = io(config.server_address, options);

    	socket.on('connect', function(){
    		$log.debug("Connection successful "+config.server_address);
            return callback();
    	});
    	socket.on('error', function(error){
    		$log.debug("Connection error "+config.server_address+" "+JSON.stringify(error));
    	});
    	socket.on('disconnect', function(){
    		$log.debug("Server disconnected "+config.server_address);
            user_profile_service.reset();
    	})

    	that.socket = socket;
    	return;
    };
    that.logout = function(callback){
        if(that.socket) {
            that.socket.disconnect();
            that.socket = null;
        }
        remember_me_service.delete();
        user_profile_service.reset();
        callback();
    };
}]);