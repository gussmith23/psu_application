define([
        'App',
        'backbone',
        'marionette',
        'models/Session',
        'models/Survey',
        'views/RegisterView',
        'views/NavigationView',
        'views/LoginView',
        'views/OverviewView',
        'views/AccountView',
        'views/NewSurveyView',
        'views/SurveyView',
        'views/ErrorView',
        'views/ManageView'
    ],
    function (App, Backbone, Marionette, Session, Survey, RegisterView, NavigationView, LoginView,
              OverviewView, AccountView, NewSurveyView, SurveyView, ErrorView, ManageView) {

        return Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                this.session = new Session();
                var _this = this;
                App.vent.on('session:logout', function () {
                    _this.session.revokeToken();
                    App.appRouter.navigate('', true);
                });
                App.navRegion.show(new NavigationView());
            },

            index: function () {
                App.navRegion.$el.hide();
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },

            register: function () {
                App.navRegion.$el.hide();
                this.session.unauthenticatedRoute(App.contentRegion.show(new RegisterView()));
            },

            login: function () {
                App.navRegion.$el.hide();
                this.session.unauthenticatedRoute(App.contentRegion.show(new LoginView()));
            },

            overview: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new OverviewView({})));
                App.navRegion.$el.show();
            },

            account: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new AccountView()));
                App.navRegion.$el.show();
            },

            newSurvey: function () {
                this.session.authenticatedRoute(App.contentRegion.show(new NewSurveyView()));
                App.navRegion.$el.show();
            },

            survey: function (permalink) {
                App.navRegion.$el.hide();
                App.contentRegion.show(new SurveyView({
                    permalink: permalink
                }));
            },

            manage: function (id) {
                App.contentRegion.show(new ManageView({
                    model: new Survey({ id: id })
                }));
                App.navRegion.$el.show();
            },

            notFound: function () {
                App.contentRegion.show(new ErrorView({}));
                App.navRegion.$el.show();
            }

        });

    });