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

        templateHelpers: function () {
            var date = new Date();
            return {
                mm: function () {
                    return date.getMonth();
                },
                dd: function () {
                    return date.getDay();
                },
                yyyy: function () {
                    return date.getYear() + 1900;
                }
            }
        },

        onShow: function () {
            $('#surveyDate').fdatepicker();
        }

    });

});