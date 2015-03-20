define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey.hbs',
        'models/Session',
        'models/Survey',
        'views/PSUSurveyView',
        'views/ErrorView'
    ],
    function (App, Marionette, Handlebars, template, Session, Survey, PSUSurveyView, ErrorView) {
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
                    console.log(result);
                    _this.main.show(new PSUSurveyView({
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