define(
    ['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, backbone, Marionette, _, Handlebars) {

        var sync = Backbone.sync;
        Backbone.sync = function (method, model, options) {
            if ($.cookie('access_token')) {
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
            Backbone.history.start({pushState: true});
            //Backbone.history.start();

            if (Backbone.history && Backbone.history._hasPushState) {
                $(document).delegate("a", "click", function(evt) {
                    var href = $(this).attr("href");
                    var protocol = this.protocol + "//";
                    if (href.slice(protocol.length) !== protocol) {
                        evt.preventDefault();
                        //Backbone.history.navigate(href, true);
                        App.appRouter.navigate(href, true);
                    }
                });
            }

        });

        // return it
        return App;

    }
);