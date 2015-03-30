define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/manage_access_components/access_empty_collection.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        initialize: function () {

        }

    });

});