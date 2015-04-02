define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/manage_access_components/access_item_row.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        ui: {
            "revokeAccessButton": "#revokeAccessButton"
        },

        events: {
            "click @ui.revokeAccessButton": "revokeAccess"
        },

        initialize: function () {
            //console.log(this.model.get('username'));
        },

        revokeAccess: function () {
            var _this = this;
            var url = '/api/survey/users/' + this._parent.model.get('id');
            $.ajax({
                type: 'DELETE',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                },
                url: url,
                data: { id: _this.model.get('id') },
                success: function (res) {
                    _this._parent.collection.remove({ id: _this.model.get('id') });
                },
                error: function (err) {
                    console.log(err);
                    if (err.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
        }

    });

});