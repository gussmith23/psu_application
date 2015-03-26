define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/new_survey.hbs',
    'models/Session'
], function (App, Marionette, Handlebars, template, Session) {
    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        ui: {
            "backButton": "#backButton"
        },

        events: {
            "click #backButton": "goBack"
        },

        goBack: function () {
            window.history.back();
        }

    });

});