define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/response_components/response_empty_collection.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr'

    });

});