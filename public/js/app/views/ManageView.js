define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/manage.hbs'
    ],
    function (App, Marionette, Handlebars, template) {

        return Marionette.ItemView.extend({

            initialize: function(params) {
                this.id = params.id;
            },

            template: Handlebars.compile(template)

        });

    });