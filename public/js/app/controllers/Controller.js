define([
        'App',
        'backbone',
        'marionette',
        'models/Session',
        'models/Survey',
        'views/RegisterView',
        'views/NavigationView',
        'views/WelcomeView',
        'views/LoginView',
        'views/OverviewView',
        'views/AccountView',
        'views/NewSurveyView',
        'views/SurveyView',
        'views/ErrorView',
        'views/ManageView'
    ],
    function (App, Backbone, Marionette, Session, Survey, RegisterView, NavigationView, WelcomeView, LoginView,
              OverviewView, AccountView, NewSurveyView, SurveyView, ErrorView, ManageView) {

        return Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                this.session = new Session();
                var _this = this;
                App.vent.on('session:logout', function () {
                    _this.session.revokeToken();
                    App.appRouter.navigate('', true);
                });
            },

            index: function () {
                App.navRegion.empty();
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },

            register: function () {
                App.navRegion.empty();
                this.session.unauthenticatedRoute(App.contentRegion.show(new RegisterView()));
            },

            login: function () {
                App.navRegion.empty();
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },

            overview: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new OverviewView({})));
                App.navRegion.show(new NavigationView());
            },

            account: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new AccountView()));
                App.navRegion.show(new NavigationView());
            },

            newSurvey: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new NewSurveyView()));
                App.navRegion.show(new NavigationView());
            },

            survey: function (permalink) {
                App.navRegion.empty();
                App.contentRegion.show(new SurveyView({
                    permalink: permalink
                }));
            },

            manage: function (id) {
                App.contentRegion.show(new ManageView({
                    model: new Survey({ id: id })
                }));
                App.navRegion.show(new NavigationView());
            },

            notFound: function () {
                App.contentRegion.show(new ErrorView({}));
                App.navRegion.show(new NavigationView());
            }

        });

    });