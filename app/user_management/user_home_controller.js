angular.module('lotr_desktop').controller('user_home_controller', 
	['$scope', 'external_server_client_service', 'user_profile_service', '$state',
	function($scope, external_server_client_service, user_profile_service, $state) {

	$scope.user_profile = user_profile_service.get();
	$scope.logout_user = function(){
		external_server_client_service.logout(function(){
			$state.go('login')
		});
	}

}]);