define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/manage.hbs',
    'views/manage_access_components/AccessItemView',
    'views/manage_access_components/AccessEmptyView'
], function (App, Marionette, Handlebars, template, AccessItemView, AccessEmptyView) {

    return Marionette.CompositeView.extend({

        initialize: function () {
            this.model.on('sync', this.render);
            this.model.on('change', this.render);
            this.model.fetch({
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if (res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
            this.collection.on('sync', this.render);
            this.collection.fetch({
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if (res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
        },

        ui: {
            "saveInfoButton": "#saveInfoButton",
            "saveNotesButton": "#saveNotesButton",
            "giveAccessButton": "#giveAccessButton",
            "giveAccessField": "#giveAccessField",
            "manageAccessButton": "#manageAccessButton",
            "surveyStatusButton": "#surveyStatusButton",
            "surveyNameField": "#survey_name",
            "surveyPermalinkField": "#survey_permalink",
            "surveyDescriptionField": "#survey_description",
            "surveyNotesField": "#survey_notes"
        },

        events: {
            "click @ui.manageAccessButton": "showAccessModal",
            "click @ui.surveyStatusButton": "changeSurveyStatus",
            "click @ui.saveInfoButton": "saveSurveyInfo",
            "click @ui.saveNotesButton": "saveSurveyNotes",
            "click @ui.giveAccessButton": "giveAccess"
        },

        template: Handlebars.compile(template),

        childView: AccessItemView,

        emptyView: AccessEmptyView,

        childViewContainer: "tbody",

        giveAccess: function () {
            var _this = this;
            var url = '/api/survey/users/' + this.model.get('id');
            console.log('click', url);
            $.post(url, { 'identification': _this.ui.giveAccessField[0].value }).then(function (result) {
                _this.collection.add(result);
            }, function (err) {
                console.log(err);
            });
        },

        saveSurveyInfo: function () {
            this.model.set({
                'survey_name': this.ui.surveyNameField[0].value,
                'survey_permalink': this.ui.surveyPermalinkField[0].value,
                'survey_description': this.ui.surveyDescriptionField[0].value
            });
            this.model.save({ wait: true });
        },

        saveSurveyNotes: function () {
            this.model.set({
                'survey_notes': this.ui.surveyNotesField[0].value
            });
            this.model.save({ wait: true });
        },

        changeSurveyStatus: function () {
            if (this.model.get('survey_status') == 'open') {
                this.model.set('survey_status', 'closed');
            } else {
                this.model.set('survey_status', 'open');
            }
            this.model.save();
        },

        showAccessModal: function () {
            $('#manageAccessModal').foundation('reveal', 'open');
        },

        templateHelpers: function () {
            var _this = this;
            return {
                surveyIsOpen: function () {
                    return _this.model.get('survey_status') == 'open';
                },
                createdDateString: function () {
                    var ds = _this.model.get('created_at');
                    var date = new Date(ds.replace(' ', 'T') + 'Z');
                    return date.toLocaleString();
                },
                updatedDateString: function () {
                    var ds = _this.model.get('updated_at');
                    var date = new Date(ds.replace(' ', 'T') + 'Z');
                    return date.toLocaleString();
                },
                badgeClass: function () {
                    if (_this.model.get('survey_status') == 'open') {
                        return 'success';
                    } else {
                        return 'alert';
                    }
                }
            }
        }

    });

});