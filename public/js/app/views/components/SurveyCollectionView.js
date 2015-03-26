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

        initialize: function (options) {
            var _this = this;
            this.sort = options.sort || '';
            this.collection.on('request', function() {
                //show loading here
                _this.emptyView = LoadingView;
            });
            this.collection.on('reset', function() {
                _this.emptyView = SurveyCollectionEmptyView;
            });
            if(options.fetch) this.collection.fetch({reset: true});
            //if(options.fetch) this.collection.fetch();
        },

        onRender: function () {
            $(this.el).attr('class', 'medium-12 columns');
        }

    });
});
