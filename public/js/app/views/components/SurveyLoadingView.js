define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/components/survey_loading.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr'

    });

});