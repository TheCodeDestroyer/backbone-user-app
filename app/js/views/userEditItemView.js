
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
            context.model.set('name', $('#nameField').val());
            context.model.set('email', $('#emailField').val());
            context.model.set('role', $('#roleField').val());

            if (context.model.isValid()) {
                context.model.save([], { success: function (){
                    context.returnToList();
                }});
            }
            else{
                var validationErros = context.model.validationError;
                for (var i = 0; i < validationErros.length; i++) {
                    $('#' + validationErros[i].field + 'Field').parent().addClass('has-error');
                    $('#' + validationErros[i].field + 'Validation').show().html(validationErros[i].error);
                }
            }


        },
        returnToList: function() {
            UserApp.router.navigate('/users', true);
        }
    });

})(UserApp, Backbone, Handlebars, jQuery);