define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/account.hbs',
    'models/User'
], function (App, Marionette, Handlebars, template, User) {

    return Marionette.ItemView.extend({

        initialize: function () {
            this.model.on('sync', this.render);
            this.model.fetch({
                reset: true,
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if(res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
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