define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey_psu.hbs'
    ],
    function (App, Marionette, Handlebars, template) {

        return Marionette.LayoutView.extend({

            template: Handlebars.compile(template)

        });

    });