define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/register.hbs'
    ],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            // Template HTML string
            template: Handlebars.compile(template),

            ui: {
                "username": "#username",
                "email": "#email",
                "password": "#password",
                "firstName": "#firstName",
                "lastName": "#lastName",
                "registerForm": "#registerForm"
            },

            onShow: function () {
                var _this = this;
                this.ui.registerForm.bootstrapValidator({
                    framework: 'bootstrap',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        username: {
                            validators: {
                                notEmpty: {
                                    message: 'Username is a required field'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 32,
                                    message: 'Username must be greater than 6 and less than 32 characters long'
                                },
                                regexp: {
                                    regexp: /^[a-zA-Z0-9_]+$/,
                                    message: 'Username can only consist of underscores and alphanumeric characters'
                                }
                            }
                        },
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'Email is a required field'
                                },
                                regexp: {
                                    regexp: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                    message: 'Email must be a valid email'
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Password is a required field'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 32,
                                    message: 'Password must be greater than 6 and less than 32 characters long'
                                },
                                regexp: {
                                    regexp: /^[a-zA-Z0-9!@#$%^&_]+$/,
                                    message: 'Password can only contain alphanumeric characters and _!@#$%^&'
                                }
                            }
                        },
                        firstName: {
                            validators: {
                                notEmpty: {
                                    message: 'First name is a required field'
                                },
                                stringLength: {
                                    min: 1,
                                    max: 32,
                                    message: 'First name must be less than 32 characters long'
                                },
                                regexp: {
                                    regexp: /^[a-zA-z\s]+$/,
                                    message: 'First name can only contain alphabetic characters'
                                }
                            }
                        },
                        lastName: {
                            validators: {
                                notEmpty: {
                                    message: 'Last name is a required field'
                                },
                                stringLength: {
                                    min: 1,
                                    max: 32,
                                    message: 'Last name must be less than 32 characters long'
                                },
                                regexp: {
                                    regexp: /^[a-zA-z\s]+$/,
                                    message: 'Last name can only contain alphabetic characters'
                                }
                            }
                        }
                    }
                }).on('success.form.bv', function (e) {
                    e.preventDefault();
                    var password = _this.ui.password[0].value;
                    var hash = CryptoJS.SHA256(password);
                    console.log(hash.toString());
                });
            },

            onDestroy: function () {

            }

        });
    }
);