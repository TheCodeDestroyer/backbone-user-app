
var UserApp = UserApp || {};

(function (UserApp, Backbone, Handlebars, $){
    'use strict';

    UserApp.UserCompositeView = Backbone.Marionette.CompositeView.extend({
        id: 'users',
        tagName: 'table',
        className: 'table table-striped',
        template : Handlebars.compile($('#usersTemplate').html()),
        itemView: UserApp.UserItemView,
        initialize: function(){
            this.listenTo(this.collection, 'sort', this.renderCollection);
        },
        appendHtml: function(collectionView, itemView){
            collectionView.$('tbody').append(itemView.el);
        }
    });

})(UserApp, Backbone, Handlebars, jQuery);