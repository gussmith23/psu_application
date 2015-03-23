define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/manage_access_components/access_item_row.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        initialize: function () {

        }

    });

});