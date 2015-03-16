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
            'item': 'td'
        },

        events: {
            'click @ui.item': 'linkTo'
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