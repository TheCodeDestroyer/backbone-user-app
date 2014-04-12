
var UserApp = UserApp || {};

(function (UserApp, Backbone, Handlebars, $){
    'use strict';

    UserApp.UserItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        className: 'user',
        template : Handlebars.compile($('#userTemplate').html())
    });

})(UserApp, Backbone, Handlebars, jQuery);