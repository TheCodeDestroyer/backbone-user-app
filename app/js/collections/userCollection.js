
var UserApp = UserApp || {};

(function (UserApp, Backbone){
    'use strict';

    UserApp.UsersCollection = Backbone.Collection.extend({
        model: UserApp.UserModel,
        url: function (){
            return UserApp.Config.apiUrl + '/list';
        }
    });

})(UserApp, Backbone);