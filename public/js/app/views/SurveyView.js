define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey.hbs',
        'models/Session',
        'models/Survey',
        'views/ISTSurveyView',
        'views/ErrorView'
    ],
    function (App, Marionette, Handlebars, template, Session, Survey, ISTSurveyView, ErrorView) {
        //ItemView provides some default rendering logic
        return Marionette.LayoutView.extend({

            initialize: function (params) {
                this.checkForSurvey(params.permalink);
            },

            regions: {
                main: "#main"
            },

            // Template HTML string
            template: Handlebars.compile(template),

            checkForSurvey: function (permalink) {
                var _this = this;
                var url = '/api/survey/has/' + permalink;
                $.get(url).then(function (result) {
                    _this.main.show(new ISTSurveyView({
                        model: new Survey(result)
                    }));
                }, function (err) {
                    _this.main.show(new ErrorView({
                        message: "Cannot access survey."
                    }));
                });
            }

        });

    });