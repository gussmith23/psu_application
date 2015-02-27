require.config({
    baseUrl: "./js/app",
    paths: {
        "jquery": "../libs/jquery",
        "jqueryui": "../libs/jqueryui",
        "underscore": "../libs/lodash",
        "backbone": "../libs/backbone",
        "marionette": "../libs/backbone.marionette",
        "handlebars": "../libs/handlebars",
        "backbone.validateAll": "../libs/plugins/Backbone.validateAll",
        "bootstrap": "../libs/plugins/bootstrap",
        "text": "../libs/plugins/text",
        "jquerycookie": "../libs/plugins/jquery.cookie",
        "bootstrapValidator": "../libs/plugins/bootstrapValidator",
        "bootstrap-datepicker": "../libs/plugins/bootstrap-datepicker",
        "crypto": "../libs/sha256",
        "sweetalert": "../libs/plugins/sweet-alert"
    },
    shim: {
        "bootstrap": ["jquery"],
        "bootstrapValidator": ["bootstrap"],
        "bootstrap-datepicker": ["bootstrap"],
        "sweetalert": ["bootstrap"],
        "jqueryui": ["jquery"],
        "jquerycookie": ["jquery"],
        "backbone": {
            "deps": ["underscore"],
            "exports": "Backbone"
        },
        "marionette": {
            "deps": ["underscore", "backbone", "jquery"],
            "exports": "Marionette"
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "backbone.validateAll": ["backbone"]
    }
});


require([
        "App",
        "routers/AppRouter",
        "controllers/Controller",
        "jquery",
        "jqueryui",
        "jquerycookie",
        "bootstrap",
        "bootstrapValidator",
        "backbone.validateAll",
        "bootstrap-datepicker",
        "crypto",
        "sweetalert"
    ], function (App, AppRouter, Controller) {
        App.appRouter = new AppRouter({
            controller: new Controller()
        });
        App.start();
    });