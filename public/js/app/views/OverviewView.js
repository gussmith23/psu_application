define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/overview.hbs',
        'views/components/SurveyCollectionView',
        'collections/Surveys'
    ],
    function (App, Marionette, Handlebars, template, SurveyCollectionView, Surveys) {
        //ItemView provides some default rendering logic
        return Marionette.LayoutView.extend({
            // Template HTML string
            template: Handlebars.compile(template),

            events: {
                'click #survey-row': 'linkTo'
            },

            regions: {
                surveysTable: '#surveys-table'
            },

            onRender: function () {
                this.surveysTable.show(new SurveyCollectionView({ collection: new Surveys() }));
            }

        });
    }
);
