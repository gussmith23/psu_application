define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/components/survey_empty_collection.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        ui: {
            'item': 'td'
        },

        events: {
            'click @ui.item': 'goToCreateSurvey'
        },

        goToCreateSurvey: function () {
            App.appRouter.navigate('new-survey', true);
        }

    });

});