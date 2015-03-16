define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/manage.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        initialize: function () {
            this.model.on('sync', this.render);
            this.model.fetch();
        },

        template: Handlebars.compile(template)

    });

});