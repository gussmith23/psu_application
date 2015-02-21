define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/account.hbs',
        'models/User'
    ],
    function (App, Marionette, Handlebars, template, User) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({

            initialize: function () {
                this.model.on('sync', this.render);
                this.model.fetch();
            },

            template: Handlebars.compile(template),

            model: new User(),

            ui: {
                "cancelButton": "#cancelButton"
            },

            events: {
                "click #cancelButton": "goBack"
            },

            goBack: function () {
                window.history.back();
            }

        });

    });