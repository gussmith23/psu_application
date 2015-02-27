define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/overview.hbs'
    ],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            // Template HTML string
            template: Handlebars.compile(template),

            templateHelpers: function () {
                var _this = this;
                return {
                    survey: _this.getSurveys(),
                    linkto: function (href) {
                        App.appRouter.location(href, true);
                    }
                }
            },

            getSurveys: function () {
                return [
                    {
                        id: 1,
                        name: 'Survey 1',
                        createdDate: 'January 1, 2015',
                        status: 'closed',
                        responses: 76
                    },
                    {
                        id: 2,
                        name: 'Survey 2',
                        createdDate: 'January 1, 2015',
                        status: 'open',
                        responses: 4
                    },
                    {
                        id: 3,
                        name: 'Survey 3',
                        createdDate: 'January 1, 2015',
                        status: 'closed',
                        responses: 54
                    },
                    {
                        id: 4,
                        name: 'Survey 4',
                        createdDate: 'January 1, 2015',
                        status: 'closed',
                        responses: 37
                    }
                ];
            }

        });
    }
);
