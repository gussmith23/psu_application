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
            "surveyNameField": "#survey_name",
            "surveyPermalinkField": "#survey_permalink",
            "surveyDescriptionField": "#survey_description",
            "surveyNotesField": "#survey_notes",
            "surveyStatusField": "#survey_status"
        },

        events: {
            "click @ui.manageAccessButton": "showAccessModal",
            "click @ui.saveInfoButton": "saveSurveyInfo",
            "click @ui.saveNotesButton": "saveSurveyNotes",
            "click @ui.giveAccessButton": "giveAccess",
            "keyup @ui.surveyPermalinkField": "replaceSpaces"
        },

        template: Handlebars.compile(template),

        childView: AccessItemView,

        emptyView: AccessEmptyView,

        childViewContainer: "tbody",

        replaceSpaces: function () {
            console.log('test');
            var str = this.ui.surveyPermalinkField[0].value;
            this.ui.surveyPermalinkField[0].value = str.replace(/\s/g, '-');
        },

        giveAccess: function () {
            var _this = this;
            var url = '/api/survey/users/' + this.model.get('id');
            console.log('click', url);
            $.ajax({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                },
                url: url,
                data: { 'identification': _this.ui.giveAccessField[0].value },
                success: function (res) {
                    _this.collection.add(res);
                    _this.ui.giveAccessField[0].value = '';
                },
                error: function (err) {
                    console.log(err);
                    if (err.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
        },

        saveSurveyInfo: function () {
            this.model.set({
                'survey_name': this.ui.surveyNameField[0].value,
                'survey_permalink': this.ui.surveyPermalinkField[0].value,
                'survey_description': this.ui.surveyDescriptionField[0].value,
                'survey_status': this.ui.surveyStatusField[0].value
            });
            this.model.save(null, {
                success: function (model, response, options) {
                    alert('Survey information updated');
                },
                wait: true
            });
        },

        saveSurveyNotes: function () {
            this.model.set({
                'survey_notes': this.ui.surveyNotesField[0].value
            });
            this.model.save(null, {
                success: function (model, response, options) {
                    alert('Survey notes updated');
                },
                wait: true
            });
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