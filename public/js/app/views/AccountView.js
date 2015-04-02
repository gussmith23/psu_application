define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/account.hbs',
    'views/account_request_components/RequestItemView',
    'views/account_request_components/RequestEmptyView'
], function (App, Marionette, Handlebars, template, RequestItemView, RequestEmptyView) {

    return Marionette.CompositeView.extend({

        initialize: function () {
            this.model.on('sync', this.render);
            this.model.on('change', this.render);
            this.model.fetch({
                reset: true,
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if(res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            });
            this.collection.on('sync', this.render);
            this.collection.fetch({
                reset: true,
                error: function (model, response, options) {
                    var res = JSON.parse(response.responseText);
                    if(res.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                }
            })
        },

        template: Handlebars.compile(template),

        childView: RequestItemView,

        emptyView: RequestEmptyView,

        childViewContainer: "tbody",

        ui: {
            "updateButton": "#updateButton",
            "usernameField": "#usernameField",
            "emailField": "#emailField",
            "firstNameField": "#firstNameField",
            "lastNameField": "#lastNameField",
            "deactivateButton": "#deactivateButton"
        },

        events: {
            "click #cancelButton": "goBack",
            "click @ui.updateButton": "updateAccount",
            "click @ui.deactivateButton": "deactivateAccount"
        },

        goBack: function () {
            window.history.back();
        },

        updateAccount: function () {
            this.model.set({
                username: this.ui.usernameField[0].value,
                email: this.ui.emailField[0].value,
                first_name: this.ui.firstNameField[0].value,
                last_name: this.ui.lastNameField[0].value
            });
            this.model.save(null, {
                success: function (model, response, options) {
                    alert('Account updated');
                }
            });
        },

        deactivateAccount: function () {
            var message = 'Are you sure you want to deactivate your account?\n\nNOTE: THIS DOES NOT DELETE YOUR ACCOUNT. CONTACT DATABASE ADMIN TO DELETE YOUR ACCOUNT.';
            if(confirm(message)) {
                this.model.set({
                    role: 'deactivated'
                });
                this.model.save(null, {
                    success: function (model, response, options) {
                        alert('Account deactivated. You will now be logged out.');
                        App.vent.trigger('session:logout');
                    }
                });
            }
        }

    });

});