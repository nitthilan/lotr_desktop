angular.module('lotr_desktop')
    .service('user_profile_service', [function(){

    var user_profile = null;
    var that = this;
    that.get = function(){ return user_profile;};
    that.set = function(profile){ user_profile = profile;};
    that.reset = function(){ user_profile = null; } 

}]);