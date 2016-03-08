angular.module('lotr_desktop')
    .service('local_hub_client_service', ['$log', function($log){

    var that = this;

    that.connect = function(local_hub_address){
    	var options = {
    		reconnection: true,
    		reconnectionDelay: 1000,
    		reconnectionDelayMax: 5000,
    		timeout: 20000
    	}
    	socket = io(local_hub_address, options);

    	socket.on('connect', function(){
    		$log.debug("Local hub connection successful "+local_hub_address);
    	});
    	socket.on('connect_error', function(error){
    		$log.debug("Local hub connection error "+local_hub_address);
    	});

    	that.socket = socket;
    	return;
    };
    that.ping = function(){
        
    }
}]);