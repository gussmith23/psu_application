define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/navigation.hbs',
    'models/Session',
    'models/User'
], function (App, Marionette, Handlebars, template, Session, User) {
    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        ui: {
            "nav/overview": "#navOverview",
            "nav/account": "#navAccount",
            "logoutButton": "#logoutButton"
        },

        events: {
            "click #logoutButton": "logout"
        },

        onRender: function () {
            //$(document).foundation();
        },

        onShow: function () {
            $('.menuItem').click(function(evt) {
                $('.toggle-topbar').click();
            });
        },

        /**
         * Function to leverage bootstrap's active class
         */
        setActiveTab: function () {
            var _this = this;
            Backbone.history.on("all", function (route, router) {
                _.each(_this.ui, function (ul) {
                    ul.removeClass('active');
                });
                if (_this.ui['nav' + window.location.pathname]) {
                    _this.ui['nav' + window.location.pathname].addClass('active');
                }
            });
        },

        logout: function () {
            //this.session.revokeToken();
            //App.controller.revokeToken();
            App.vent.trigger('session:logout');
            //App.appRouter.navigate('', true);
            window.location.reload(); // force reload
        }

    });
});