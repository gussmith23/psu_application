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
            "deactivateButton": "#deactivateButton",
            "oldPasswordField": "#oldPasswordField",
            "newPasswordField": "#newPasswordField",
            "confirmPasswordField": "#confirmPasswordField",
            "updatePasswordButton": "#updatePasswordButton"
        },

        events: {
            "click #cancelButton": "goBack",
            "click @ui.updateButton": "updateAccount",
            "click @ui.deactivateButton": "deactivateAccount",
            "click @ui.updatePasswordButton": "updatePassword"
        },

        templateHelpers: function () {
            var _this = this;
            return {
                disabled: function () {
                    if(_this.model.get('username') == 'adminaccount') {
                        return 'disabled';
                    }
                }
            }
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

        updatePassword: function () {
            var _this = this;

            var _oldPassword = CryptoJS.SHA256(_this.ui.oldPasswordField[0].value).toString();
            var _newPassword = CryptoJS.SHA256(_this.ui.newPasswordField[0].value).toString();
            var _confirmPassword = CryptoJS.SHA256(_this.ui.confirmPasswordField[0].value).toString();

            if(_newPassword != _confirmPassword) {
                alert('Passwords do not match.');
            } else {
                $.ajax({
                    type: 'PUT',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                    },
                    url: '/api/user/pw',
                    data: { 
                        old_password: _oldPassword,
                        new_password: _newPassword 
                    },
                    success: function (res) {
                        _this.ui.confirmPasswordField[0].value = ''; 
                        _this.ui.newPasswordField[0].value = '';
                        _this.ui.oldPasswordField[0].value = '';
                        alert('Password updated!');
                    },
                    error: function (err) {
                        console.log(err);
                        if (err.error == "invalid_bearer_token") App.vent.trigger('session:logout');
                        _this.ui.confirmPasswordField[0].value = ''; 
                        _this.ui.newPasswordField[0].value = '';
                        _this.ui.oldPasswordField[0].value = '';
                        alert('Old password is incorrect. Try again.');
                    }
                });
            }
        },

        deactivateAccount: function () {
            if(this.model.get('username') == 'adminaccount') {
                alert('This account is the super admin account and cannot be deactivated.');
            } else {
                var message = 'Are you sure you want to deactivate your account?\n\nNOTE: THIS DOES NOT DELETE YOUR ACCOUNT. CONTACT DATABASE ADMIN TO DELETE YOUR ACCOUNT.';
                if (confirm(message)) {
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
        }

    });

});