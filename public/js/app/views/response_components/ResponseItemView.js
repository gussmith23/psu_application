define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/response_components/response_item_row.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr'

    });

});