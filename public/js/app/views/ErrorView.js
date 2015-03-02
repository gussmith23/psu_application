define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/error.hbs'
    ],
    function (App, Marionette, Handlebars, template) {

        return Marionette.ItemView.extend({

            initialize: function(params) {
                this.message = params.message || "There was a problem accessing the requested page.";
            },

            template: Handlebars.compile(template),

            templateHelpers: function () {
                var _this = this;
                return {
                    message: function () {
                        return _this.message;
                    }
                }
            }

        });

    });