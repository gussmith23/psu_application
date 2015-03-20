define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey_psu.hbs'
    ],
    function (App, Marionette, Handlebars, template) {

        return Marionette.ItemView.extend({

            template: Handlebars.compile(template),

            initialize: function () {
                console.log(this.model);
            },

            ui: {
                "surveyForm": "#surveyForm"
            },

            events: {
                "change @ui.surveyForm": "checkAttributes"
            },

            checkAttributes: function () {
                if(document.getElementById('surveyForm').ethnicity.value == 8) {
                    document.getElementById('ethnicityOtherContainer').style.display = 'block';
                } else {
                    document.getElementById('ethnicityOtherContainer').style.display = 'none';
                }
            }

        });

    });