angular.module('lotr_desktop')
    .service('remember_me_service', ['db_service', '$log', function(db_service, $log){

    var that = this;
    var remember_me_db = db_service.get_remember_me();
    var remember_me_id = "OnlyEntry";

    that.get = function(callback){
    	remember_me_db.findOne({_id:remember_me_id}, callback);
    };
    that.set = function(user_profile, token){
    	remember_me_db.update({_id:remember_me_id}, 
				{_id:remember_me_id, user_profile: user_profile, token:token}, {upsert: true});
    };
    that.delete = function(){
    	remember_me_db.remove({}, {}, function (error, numRemoved) {});
    }
}]);
