define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/application.hbs'
    ],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.Layout.extend({
            // Template HTML string
            template: Handlebars.compile(template),
            regions: {
                navRegion: "#navRegion",
                contentRegion: "#contentRegion"
            }
        });
    });