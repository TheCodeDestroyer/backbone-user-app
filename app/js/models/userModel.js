
var UserApp = UserApp || {};

(function (UserApp, Backbone){
    'use strict';

    UserApp.UserModel = Backbone.Model.extend({
        urlRoot: function (){
            return UserApp.Config.apiUrl + '/list';
        },
        url: function (){
            return this.urlRoot() + '/' + (this.id ? this.id : 'add');
        }
    });

})(UserApp, Backbone);