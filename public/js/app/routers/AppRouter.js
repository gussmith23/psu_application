define([
        'marionette',
        'controllers/Controller',
        'models/Session'
    ],
    function(Marionette, Controller, Session) {
        return Marionette.AppRouter.extend({
            appRoutes: {
                "": "index",
                "register": "register",
                "login": "login",
                "overview": "overview",
                "account": "account",
                "new-survey": "newSurvey",
                "survey/:permalink": "survey",
                "survey/manage/:id": "manage",
                "*notFound": "notFound"
            }
        });
    });