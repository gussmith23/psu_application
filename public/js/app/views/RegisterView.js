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
                this.ui.registerForm.formValidation({
                    framework: 'foundation',
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
                    _this.register();
                });
            },

            onDestroy: function () {
                this.ui.registerForm.data('formValidation').destroy();
            },

            register: function () {
                var _this = this;
                var data = {
                    "username": this.ui.username[0].value,
                    "email": this.ui.email[0].value,
                    "password": CryptoJS.SHA256(this.ui.password[0].value).toString(),
                    "first_name": this.ui.firstName[0].value,
                    "last_name": this.ui.lastName[0].value
                };
                $.post("/api/user", data).then(function (res) {
                    App.navRegion.currentView.render();
                    App.appRouter.navigate('login', true);
                }, function (err) {
                    swal("Error!", "Your account could not be registered. This could mean that the username or email you input is already in use.", "error");
                    _this.ui.username[0].value = '';
                    _this.ui.email[0].value = '';
                    _this.ui.password[0].value = '';
                    _this.ui.registerForm.data('bootstrapValidator').updateStatus('username', 'INVALID');
                    _this.ui.registerForm.data('bootstrapValidator').updateStatus('email', 'INVALID');
                    _this.ui.registerForm.data('bootstrapValidator').updateStatus('password', 'INVALID');
                    console.log('error', err.responseText);
                });

            }


        });
    }
);