define([
    'App',
    'backbone',
    'marionette',
    'handlebars',
    'text!templates/components/survey_collection_table.hbs',
    'views/components/SurveyItemView',
    'views/components/SurveyCollectionEmptyView',
    'views/components/SurveyLoadingView'
], function (App, Backbone, Marionette, Handlebars, template, SurveyItemView, SurveyCollectionEmptyView, LoadingView) {

    return Marionette.CompositeView.extend({

        tagName: 'table',

        template: Handlebars.compile(template),

        childView: SurveyItemView,

        emptyView: SurveyCollectionEmptyView,

        childViewContainer: "tbody",

        loadingView: LoadingView,

        initialize: function (options) {
            this.sort = options.sort || '';
            if(options.fetch) this.collection.fetch();
        },

        onRender: function () {
            $(this.el).attr('class', 'table table-hover');
        }

    });
});
