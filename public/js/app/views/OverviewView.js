define([
    'App',
    'backbone',
    'marionette',
    'handlebars',
    'text!templates/overview.hbs',
    'views/components/SurveyCollectionView',
    'collections/Surveys'
], function (App, Backbone, Marionette, Handlebars, template, SurveyCollectionView, Surveys) {

    return Marionette.LayoutView.extend({

        template: Handlebars.compile(template),

        ui: {
            'searchField': '#survey-search-field',
            'searchButton': "#survey-search-button"
        },

        events: {
            "keyup @ui.searchField": "updateFilter"
            //"click @ui.searchButton": "updateFilter"
        },

        regions: {
            surveysTable: '#surveys-table'
        },

        onRender: function () {
            this.surveysTable.show(new SurveyCollectionView({ collection: new Surveys(), fetch: true }));
        },

        /**
         * Used to do real-time updating of the surveys table
         */
        updateFilter: _.debounce(function () {
            var input = this.ui.searchField[0].value;
            var collection = new Surveys();
            var _this = this;
            collection.fetch({
                success: function (collection, response, options) {
                    var filteredCollection = _.filter(collection.models, function (model) {
                        return new RegExp("(" + input + ")+", "gi").test(model.get('survey_name'));
                    });
                    var newCollection = new Surveys(filteredCollection);
                    _this.surveysTable.show(new SurveyCollectionView({ collection: newCollection, fetch: false }));
                },
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if(res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
        }, 250, false)

    });
});
