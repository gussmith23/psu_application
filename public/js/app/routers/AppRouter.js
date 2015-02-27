define([
        'marionette',
        'controllers/Controller',
        'models/Session'
    ],
    function(Marionette, Controller, Session) {
        return Marionette.AppRouter.extend({
            //"index" must be a method in AppRouter's controller
            appRoutes: {
                "": "index",
                "register": "register",
                "login": "login",
                "overview": "overview",
                "account": "account",
                "new-survey": "newSurvey",
                "survey/:id": "survey"
            }
        });
    });