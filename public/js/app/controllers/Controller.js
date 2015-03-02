define([
        'App',
        'backbone',
        'marionette',
        'models/Session',
        'views/RegisterView',
        'views/NavigationView',
        'views/WelcomeView',
        'views/LoginView',
        'views/OverviewView',
        'views/AccountView',
        'views/NewSurveyView',
        'views/SurveyView',
        'views/ErrorView'
    ],
    function (App, Backbone, Marionette, Session, RegisterView, NavigationView, WelcomeView, LoginView,
              OverviewView, AccountView, NewSurveyView, SurveyView, ErrorView) {

        return Backbone.Marionette.Controller.extend({
            
            initialize: function (options) {
                App.navRegion.show(new NavigationView());
                this.session = new Session();
            },

            index: function () {
                App.navRegion.$el.show();
                this.session.unauthenticatedRoute(App.contentRegion.show(new WelcomeView()));
            },

            register: function () {
                App.navRegion.$el.show();
                this.session.unauthenticatedRoute(App.contentRegion.show(new RegisterView()));
            },

            login: function () {
                App.navRegion.$el.show();
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },

            overview: function () {
                App.navRegion.$el.show();
                this.session.authenticatedRoute(App.contentRegion.show(new OverviewView()));
            },

            account: function () {
                App.navRegion.$el.show();
                this.session.authenticatedRoute(App.contentRegion.show(new AccountView()));
            },

            newSurvey: function () {
                App.navRegion.$el.show();
                this.session.authenticatedRoute(App.contentRegion.show(new NewSurveyView()));
            },

            survey: function (permalink) {
                App.navRegion.$el.hide();
                App.contentRegion.show(new SurveyView({
                    permalink: permalink
                }));
            },

            notFound: function () {
                App.navRegion.$el.show();
                App.contentRegion.show(new ErrorView({

                }));
            }

        });

    });