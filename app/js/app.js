

var UserApp = new Backbone.Marionette.Application();

(function (UserApp, $){
    'use strict';

    $(function(){
        UserApp.start();
    });

    var UserAppRouter = Backbone.Marionette.AppRouter.extend({
        routes: {
            '': 'redirectToUsers',
            'users': 'userList',
            'users/:id': 'editUser',
            'deleteUser/:id': 'deleteUser'
        },

        redirectToUsers : function(){
            this.navigate('/users', true);
        },
        userList : function(){
            var users = new UserApp.UsersCollection();
            users.fetch();
            var usersView = new UserApp.UserCompositeView({
                collection: users
            });
            UserApp.contentRegion.show(usersView);
        },
        editUser : function(id){
            var context = this;
            var user = new UserApp.UserModel();
            if(id > 0){
                user.id = id;
                user.fetch({success: function (){
                    context.openEditView(user);
                }});
            }
            else{
                context.openEditView(user);
            }
        },
        deleteUser : function(userId){
            var context = this;
            var userToDelete = new UserApp.UserModel({ id: userId });
            userToDelete.fetch({success: function (){
                userToDelete.destroy({success: function () {
                    context.userList();
                }});
            }, error: function () {
                context.userList();
            }});
        },
        openEditView: function (user) {
            var userEditView = new UserApp.UserEditItemView({
                model: user
            });
            UserApp.contentRegion.show(userEditView);
        }
    });

    UserApp.addRegions({
        contentRegion: '#contentSection'
    });

    UserApp.addInitializer(function(){
        UserApp.router = new UserAppRouter();
        UserApp.Config =  {apiUrl: 'http://localhost:3412'};
        Backbone.history.start();
    });

})(UserApp, jQuery);
