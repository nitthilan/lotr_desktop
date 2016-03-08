angular.module('lotr_desktop')
    .service('display_message_service', ['$mdToast', '$log', function($mdToast, $log){

    var that = this;
    that.send = function(message){
    	$log.info(message);
		$mdToast.showSimple(message);
    };
}]);