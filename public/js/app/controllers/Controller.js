define([
    'App',
    'backbone',
    'marionette',
    'models/Session',
    'models/Survey',
    'models/Account',
    'collections/RequestUsers',
    'collections/SurveyUsers',
    'collections/SurveyResponses',
    'views/RegisterView',
    'views/NavigationView',
    'views/LoginView',
    'views/OverviewView',
    'views/AccountView',
    'views/NewSurveyView',
    'views/SurveyView',
    'views/ErrorView',
    'views/ManageView',
    'views/ResponsesView'
], function (App, Backbone, Marionette, Session, Survey, Account, RequestUsers, SurveyUsers, SurveyResponses, RegisterView, NavigationView, LoginView,
             OverviewView, AccountView, NewSurveyView, SurveyView, ErrorView, ManageView, ResponsesView) {

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.session = new Session();
            var _this = this;
            App.vent.on('session:logout', function () {
                $.ajax({
                    type: 'POST',
                    url: '/api/revoke',
                    success: function (res) {
                        _this.session.revokeToken();
                        App.appRouter.navigate('', true);
                    }
                });
                App.navRegion.$el.hide();
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
            this.session.authenticatedRoute(App.contentRegion.show(new AccountView({
                model: new Account(),
                collection: new RequestUsers()
            })));
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
            this.session.authenticatedRoute(App.contentRegion.show(new ManageView({
                model: new Survey({ id: id }),
                collection: new SurveyUsers({ survey_id: id })
            })));
            App.navRegion.$el.show();
        },

        responses: function (id) {
            this.session.authenticatedRoute(App.contentRegion.show(new ResponsesView({
                model: new Survey({ id: id }),
                survey_id: id
            })));
            App.navRegion.$el.show();
        },

        notFound: function () {
            App.contentRegion.show(new ErrorView({}));
            App.navRegion.$el.show();
        }

    });

});