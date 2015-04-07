define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/new_survey.hbs',
    'models/Survey'
], function (App, Marionette, Handlebars, template, Survey) {
    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        ui: {
            "backButton": "#backButton",
            "autoFillButton": "#autoFillButton",
            "clearButton": "#clearButton",
            "surveyNameField": "#surveyName",
            "surveyDescriptionField": "#surveyDescription",
            "createButton": "#createButton"
        },

        events: {
            "click @ui.backButton": "goBack",
            "click @ui.autoFillButton": "autoFillFields",
            "click @ui.clearButton": "clearFields",
            "click @ui.createButton": "createSurvey"
        },

        templateHelpers: function () {
            var date = new Date();
            return {
                mm: function () {
                    return date.getMonth() + 1;
                },
                dd: function () {
                    return date.getDate();
                },
                yyyy: function () {
                    return date.getYear() + 1900;
                }
            }
        },

        onShow: function () {
            $('#surveyDate').fdatepicker();
        },

        createSurvey: function() {
            var data = {
                'survey_name': this.ui.surveyNameField[0].value,
                'survey_description': this.ui.surveyDescriptionField[0].value
            };
            $.ajax({
                type: 'POST',
                data: data,
                url: '/api/survey',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                },
                success: function (res) {
                    //console.log(res);
                    App.appRouter.navigate('survey/manage/' + res.data, true);
                },
                error: function (err) {
                    console.error(err);
                }
            });
        },

        autoFillFields: function () {
            var date = new Date();
            var adjs = [
                "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
                "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
                "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
                "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
                "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
                "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
                "wandering", "withered", "wild", "black", "young", "holy", "solitary",
                "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
                "polished", "ancient", "purple", "lively", "nameless"
            ];
            var nouns = [
                "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
                "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
                "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
                "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
                "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
                "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
                "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
                "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
                "frog", "smoke", "star"
            ];
            this.ui.surveyNameField[0].value = adjs[Math.floor(Math.random() * adjs.length)].capitalizeFirstLetter() + ' ' + nouns[Math.floor(Math.random() * nouns.length)].capitalizeFirstLetter() + ' -- ' + date.toDateString();
            this.ui.surveyDescriptionField[0].value = 'Survey from ' + date.toDateString();
        },

        clearFields: function () {
            this.ui.surveyNameField[0].value = '';
            this.ui.surveyDescriptionField[0].value = '';
        }

    });

});