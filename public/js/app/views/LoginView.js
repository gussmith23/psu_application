define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/login.hbs',
        'models/Session'
    ],
    function (App, Marionette, Handlebars, template, Session) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            // Template HTML string
            template: Handlebars.compile(template),

            initialize: function () {
                this.session = new Session();
            },

            ui: {
                "loginForm": "#loginForm",
                "identification": "#identification",
                "password": "#password",
                "loginButton": "#loginButton"
            },

            events: {
                //"enter @ui.password": "login",
                //"enter @ui.identification": "login"
            },

            onShow: function () {
                var _this = this;
                // setup bootstrap validator
                this.ui.loginForm.formValidation({
                    framework: 'foundation',
                    fields: {
                        identification: {
                            validators: {
                                notEmpty: {
                                    message: "Username or email required"
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Password is a required field'
                                }
                            }
                        }
                    }
                }).on('success.form.fv', function (e) {
                    e.preventDefault();
                    _this.login();
                });

            },

            onDestroy: function () {
                this.ui.loginForm.data('formValidation').destroy();
            },

            login: function () {
                if(!this.ui.loginForm.data('formValidation').isValid()) return;
                var _this = this;
                var data = {
                    "grant_type": "password",
                    "username": this.ui.identification[0].value,
                    "password": CryptoJS.SHA256(this.ui.password[0].value).toString()
                };
                $.post(this.session.get('tokenEndpoint'), data).then(function (res) {
                    if(res['role'] == 'user') {
                        $('#loginRequestUserModal').foundation('reveal', 'open');
                    } else {
                        _this.session.setToken(res);
                        App.appRouter.navigate('overview', true);
                        //App.navRegion.currentView.render();
                    }
                }, function (err) {
                    $('#loginErrorModal').foundation('reveal', 'open');
                    console.log('error', err.responseText);
                });
            }

        });
    });