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
                "password": "#password"
            },

            events: {},

            onShow: function () {
                var _this = this;
                // setup bootstrap validator
                this.ui.loginForm.bootstrapValidator({
                    framework: 'bootstrap',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
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
                }).on('success.form.bv', function (e) {
                    e.preventDefault();
                    _this.login();
                });

            },

            onDestroy: function () {
                this.ui.loginForm.data('bootstrapValidator').destroy();
            },

            login: function () {
                var _this = this;
                var data = {
                    "grant_type": "password",
                    "username": this.ui.identification[0].value,
                    "password": CryptoJS.SHA256(this.ui.password[0].value).toString()
                };
                $.post(this.session.get('tokenEndpoint'), data).then(function (res) {
                    _this.session.setToken(res);
                    App.appRouter.navigate('overview', true);
                    App.navRegion.currentView.render();
                }, function (err) {
                    console.log('error', err.responseText);
                });
            }

        });
    });