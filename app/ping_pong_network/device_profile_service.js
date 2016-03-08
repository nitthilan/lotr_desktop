angular.module('lotr_desktop').service('device_profile_service', 
	['config_service', '$log', 'db_service', 'external_server_client_service',
	function(config_service, $log, db_service, external_server_client_service){

    var that = this;
    that.device_profile = null;

    var get_ip = function(){
    	// Local ip address that we're trying to calculate
		var network, os = require('os') ,ifaces = os.networkInterfaces();
		// Iterate over interfaces ...
		for (var dev in ifaces) {

		    // ... and find the one that matches the criteria
		    var iface = ifaces[dev].filter(function(details) {
		        return ((details.family === 'IPv4' && details.internal === false) /*||
		        	(config_service.get().tag = 'development' && details.family === 'IPv4')*/);
		    });

		    if(iface.length > 0) network = iface[0];
		}
		//$log.info(network.address+" "+network.netmask);
		//$log.info(JSON.stringify(ifaces));
		return {address: network.address, netmask: network.netmask}
    }

    that.update = function(user_profile_id, callback){
    	var device_id_db = db_service.get_device_id();
    	var device_profile = {
    		ip : get_ip(),
    		is_connected_to_server : true
    	};
		device_id_db.findOne({user_id: user_profile_id}, function(error, device_id){

		// If doc is present then update the device info in the server
		if(device_id){ device_profile._id = device_id._id;}

		//$log.info("Device id "+JSON.stringify(device_id)+" "+JSON.stringify(device_profile));
		
		// Assuming the device type is hardcoded to hub for desktop
		external_server_client_service.socket.emit("upsert_device_profile", device_profile, function(error, device_profile){

		if(error){$log.info("Error in upsert device "+error.message); return callback();}
		//$log.info("created device "+JSON.stringify(device_id)+" "+JSON.stringify(device_profile));

		// Create a model to store the current device id for this particualr user. All other details are irrelevant
		device_id_db.update({user_id: user_profile_id}, {_id: device_profile._id, user_id: user_profile_id}, {upsert: true});
		that.device_profile = device_profile;
		return callback();
		});
		});
    }
    that.get = function(){
    	return that.device_profile;
    }
}]);