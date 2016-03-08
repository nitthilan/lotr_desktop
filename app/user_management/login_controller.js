angular.module('lotr_desktop').controller('login_controller', 
	['$scope','external_server_client_service', 'device_profile_service', '$state', 
	'display_message_service','remember_me_service','user_profile_service',
	function($scope, external_server_client_service, device_profile_service, $state, 
		display_message_service, remember_me_service, user_profile_service) {

	var init_user = function(){
		$scope.user = {};
		$scope.user.is_remember = false;
		$scope.user.is_create = false;
	};
	init_user();
	remember_me_service.get(function(error, remember_me){
		if(remember_me){
			external_server_client_service.connect(function(){
			connect_and_update(null, remember_me.token);
			});
		}
		else{
			display_message_service.send("No auto login enabled");
		}
	});


	var connect_and_update = function(error, token){
		if(error){ display_message_service.send("Error: User login/create failed "+error.message); init_user(); return;}
		external_server_client_service.socket.emit("authentication", token);
		external_server_client_service.socket.on("authenticated", function(){
		external_server_client_service.socket.emit("is_user_logged_in", function(error, user_profile){
		if($scope.user.is_remember){ remember_me_service.set(user_profile, token);}
		if(error){ display_message_service.send("User login check failed "+error.message); init_user(); return;}
		// Store user profile for other modules to use
		user_profile_service.set(user_profile);
		// Update the device profile
		device_profile_service.update(user_profile._id, function(){
		$state.go('user_home');		
		});
		});
		});
	}

	// Use remember service to get the last remembered token and try logging in

	$scope.create_user = function(){
		external_server_client_service.connect(function(){
		external_server_client_service.socket.emit("user_create",$scope.user, connect_and_update);
		});
	};
	$scope.login_user = function(){
		external_server_client_service.connect(function(){
		external_server_client_service.socket.emit("user_login",$scope.user, connect_and_update);
		});
	};


}]);