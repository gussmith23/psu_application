define(
    ['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, backbone, Marionette, _, Handlebars) {

        var sync = Backbone.sync;
        Backbone.sync = function(method, model, options) {
            if($.cookie('access_token')) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $.cookie('access_token'));
                };
            }
            sync(method, model, options);
        };

        // create the app
        var App = new Backbone.Marionette.Application();

        // add the basic regions
        App.addRegions({
            contentRegion: "#contentRegion",
            navRegion: "#navRegion"
        });

        // start it up
        App.addInitializer(function (options) {
            Backbone.history.start();
        });

        // return it
        return App;

    }
);