define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey.hbs',
        'models/Session',
        'views/PSUSurveyView',
        'views/ErrorView'
    ],
    function (App, Marionette, Handlebars, template, Session, PSUSurveyView, ErrorView) {
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
                var url = '/api/survey/' + permalink;
                $.get(url).then(function (result) {
                    _this.main.show(new PSUSurveyView());
                }, function (err) {
                    _this.main.show(new ErrorView({
                        message: "Cannot access survey."
                    }));
                });
            }

        });

    });