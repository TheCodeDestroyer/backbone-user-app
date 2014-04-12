
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
                var validationErrors = context.model.validationError;
                $('.has-error').find('span').hide().html('');
                $('.has-error').removeClass('has-error');

                for (var i = 0; i < validationErrors.length; i++) {
                    $('#' + validationErrors[i].field + 'Field').parent().addClass('has-error');
                    $('#' + validationErrors[i].field + 'Validation').show().html(validationErrors[i].error);
                }
            }


        },
        returnToList: function() {
            UserApp.router.navigate('/users', true);
        }
    });

})(UserApp, Backbone, Handlebars, jQuery);