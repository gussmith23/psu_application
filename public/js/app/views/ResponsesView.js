define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/responses.hbs',
        'views/response_components/ResponseItemView',
        'views/response_components/ResponseEmptyView'
    ],
    function (App, Marionette, Handlebars, template, ChildView, EmptyView) {
        //ItemView provides some default rendering logic
        return Marionette.CompositeView.extend({

            initialize: function () {
                this.collection.on('sync', this.render);
                this.collection.fetch({ reset: true });
            },

            // Template HTML string
            template: Handlebars.compile(template),

            childViewContainer: "tbody",

            childView: ChildView,

            emptyView: EmptyView

        });

    });