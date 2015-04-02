define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/account_request_components/request_item_row.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        tagName: 'tr',

        ui: {
            "buttonActivate": "#buttonActivate",
            "buttonDelete": "#buttonDelete"
        },

        events: {
            "click @ui.buttonActivate": "activateAccount",
            "click @ui.buttonDelete": "deleteAccount"
        },

        onShow: function () {
            $(document).foundation();
        },

        activateAccount: function () {
            var _this = this;
            this.model.set({
                'role': 'admin'
            });
            this.model.save(null, {
                success: function (model, response, options) {
                    _this._parent.collection.remove({ id: _this.model.get('id') });
                }
            });
        },

        deleteAccount: function () {
            var _this = this;
            this.model.destroy({
                success: function (model, response, options) {
                    _this._parent.collection.remove({ id: _this.model.get('id') });
                }
            });
        }

    });

});