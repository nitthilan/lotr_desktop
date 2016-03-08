// Include the dependency upon ngMaterial - important !!
var lotr_desktop = angular.module('lotr_desktop', ['ngMaterial', 'ui.router']);
lotr_desktop.constant('application_mode', 'development');

lotr_desktop.config(['$stateProvider', '$urlRouterProvider', '$logProvider',
	function($stateProvider, $urlRouterProvider, $logProvider){

	$logProvider.debugEnabled(true);

	$stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'user_management/login.html',
        controller: 'login_controller'
      })
      .state('user_home', {
        url: '/user_home',
        templateUrl: 'user_management/user_home.html',
        controller: 'user_home_controller'
      })
      .state('test', {
        url: 'setup/test.html',
        template: null,
        controller: 'test_controller'
      });

      $urlRouterProvider.otherwise('/');

}]);

lotr_desktop.run(['$rootScope', '$state', '$stateParams', 'config_service', 'user_profile_service','$log',
	function ($rootScope, $state, $stateParams, config_service, user_profile_service, $log) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){ 
        if(toState.name === 'login' && user_profile_service.get()){
          //$log.info("Go to home");
          event.preventDefault();
          $state.go("user_home");
        }
        else if(toState.name !== 'login' && !user_profile_service.get()){
          //$log.info("Go to login "+JSON.stringify(toState)+" "+user_profile_service.get());
          event.preventDefault();
          $state.go("login");
        }
    });

    // enabling development for configuration
    config_service.init('development');
	var config = config_service.get();
}]);