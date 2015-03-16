define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/components/survey_collection_table.hbs',
        'views/components/SurveyItemView'
    ],
    function (App, Marionette, Handlebars, template, SurveyItemView) {
        //ItemView provides some default rendering logic
        return Marionette.CompositeView.extend({

            tagName: 'table',

            template: Handlebars.compile(template),

            childView: SurveyItemView,

            childViewContainer: "tbody",

            onAttach: function () {
                this.collection.fetch();
            },

            onRender: function () {
                $(this.el).attr('class', 'table table-hover');
            }

        });
    }
);
