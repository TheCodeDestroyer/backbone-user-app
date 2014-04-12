
var UserApp = UserApp || {};

(function (UserApp, Backbone){
    'use strict';

    UserApp.UserModel = Backbone.Model.extend({
        urlRoot: function (){
            return UserApp.Config.apiUrl + '/list';
        },
        url: function (){
            return this.urlRoot() + '/' + (this.id ? this.id : 'add');
        },
        validate: function (attrs) {
            var validationErrors = new Array();
            if (!attrs.name) {
                validationErrors.push({ field:'name', error: 'Please fill name field.'});
            }
            if (!attrs.email) {
                validationErrors.push({ field:'email', error: 'Please fill email field.'});

            }
            if (!attrs.role) {
                validationErrors.push({ field:'role', error: 'Please fill role field.'});
            }
            if  (validationErrors.length > 0){
                return validationErrors;
            }
        }
    });

})(UserApp, Backbone);