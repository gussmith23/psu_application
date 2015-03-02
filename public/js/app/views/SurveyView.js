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
                    //console.log(result);
                    _this.main.show(new PSUSurveyView());
                }, function (err) {
                    //console.error(err);
                    _this.main.show(new ErrorView({
                        message: "Cannot access survey."
                    }));
                });
            }

            //ui: {
            //    "surveyForm": "#surveyForm"
            //},
            //
            //events: {
            //    "change @ui.surveyForm": "checkAttributes"
            //},
            //
            //checkAttributes: function () {
            //    if(document.getElementById('surveyForm').ethnicity.value == 8) {
            //        document.getElementById('ethnicityOtherContainer').style.display = 'block';
            //    } else {
            //        document.getElementById('ethnicityOtherContainer').style.display = 'none';
            //    }
            //}

        });

    });