define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/account_request_components/request_empty_collection.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        initialize: function () {

        }

    });

});