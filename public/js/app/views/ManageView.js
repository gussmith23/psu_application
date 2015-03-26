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
            this.model.fetch({
                error: function (model, response, options) {
                    App.vent.trigger('session:logout');
                }
            });
            this.collection.on('sync', this.render);
            this.collection.fetch({
                error: function (model, response, options) {
                    App.vent.trigger('session:logout');
                }
            });
        },

        ui: {
            "manageAccessButton": "#manageAccessButton"
        },

        events: {
            "click @ui.manageAccessButton": "showAccessModal"
        },

        template: Handlebars.compile(template),

        childView: AccessItemView,

        emptyView: AccessEmptyView,

        childViewContainer: "tbody",

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