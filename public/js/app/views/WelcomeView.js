define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/welcome.hbs'
    ],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            // Template HTML string
            template: Handlebars.compile(template)
        });
    }
);