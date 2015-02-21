define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/navigation.hbs',
        'models/Session'
    ],
    function (App, Marionette, Handlebars, template, Session) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({

            initialize: function () {
                this.session = new Session();
            },

            template: Handlebars.compile(template),

            templateHelpers: function () {
                var _this = this;
                return {
                    isAuthenticated: function () {
                        return _this.session.isAuthenticated();
                    }
                }
            },

            ui: {
                "nav": "#navHome",
                "nav#login": "#navLogin",
                "nav#register": "#navRegister",
                "nav#overview": "#navOverview",
                "nav#account": "#navAccount",
                "logoutButton": "#logoutButton"
            },

            events: {
                "click #logoutButton": "logout"
            },

            onShow: function () {
                this.setActiveTab();
            },

            /**
             * Function to leverage bootstrap's active class
             */
            setActiveTab: function () {
                var _this = this;
                Backbone.history.on("all", function (route, router) {
                    _.each(_this.ui, function(ul) {
                        ul.removeClass('active');
                    });
                    _this.ui['nav' + window.location.hash].addClass('active');
                });
            },

            logout: function () {
                this.session.revokeToken();
                window.location.reload(); // force reload
                window.location.hash = "";
            }

        });
    });