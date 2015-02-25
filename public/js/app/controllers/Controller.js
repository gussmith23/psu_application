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
        'models/User'
    ],
    function (App, Backbone, Marionette, Session, RegisterView, NavigationView, WelcomeView, LoginView, OverviewView, AccountView, NewSurveyView, SurveyView, User) {
        return Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                App.navRegion.show(new NavigationView());
                this.session = new Session();
            },
            index: function () {
                this.session.unauthenticatedRoute(App.contentRegion.show(new WelcomeView()));
            },
            register: function () {
                this.session.unauthenticatedRoute(App.contentRegion.show(new RegisterView()));
            },
            login: function () {
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },
            overview: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new OverviewView()));
            },
            account: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new AccountView()));
            },
            newSurvey: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new NewSurveyView()));
            },
            survey: function () {
                App.contentRegion.show(new SurveyView());
            }
        });
    });