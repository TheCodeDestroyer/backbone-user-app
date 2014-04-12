
var UserApp = UserApp || {};

(function (UserApp, Backbone, Handlebars, $){
    'use strict';

    UserApp.UserEditItemView = Backbone.Marionette.ItemView.extend({
        mode: UserApp.UserModel,
        events: {
            'click #saveUser': 'saveUser',
            'click #cancel': 'returnToList'
        },
        template : Handlebars.compile($('#userEditTemplate').html()),
        saveUser: function() {
            var context = this;
            context.model.attributes.name = $('#nameField').val();
            context.model.attributes.email = $('#emailField').val();
            context.model.attributes.role = $('#roleField').val();
            context.model.save([], { success: function (){
                context.returnToList();
            }});
        },
        returnToList: function() {
            UserApp.router.navigate('/users', true);
        }
    });

})(UserApp, Backbone, Handlebars, jQuery);