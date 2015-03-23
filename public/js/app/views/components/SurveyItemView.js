define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/components/survey_item_row.hbs',
    'views/ManageView'
], function (App, Marionette, Handlebars, template, ManageView) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        ui: {
            'item': '#edit-button'
        },

        events: {
            'click @ui.item': 'linkTo'
        },

        templateHelpers: function () {
            var _this = this;
            return {
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
                    if(_this.model.get('survey_status') == 'open') {
                        return 'success';
                    } else {
                        return 'alert';
                    }
                },
                badgeClassBoolean: function () {
                    return _this.model.get('survey_status') == 'open';
                }
            }
        },

        onRender: function () {
            if (this.model.get('survey_status') === 'open') {
                $(this.el).addClass('success');
            }
        },

        linkTo: function (event) {
            var url = '/survey/manage/' + this.model.get('id');
            App.appRouter.navigate(url, true);
        }

    });

});