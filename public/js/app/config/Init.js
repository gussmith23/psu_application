require.config({
    baseUrl: "/js/app",
    paths: {
        "jquery": "../libs/jquery",
        "jqueryui": "../libs/jqueryui",
        "underscore": "../libs/lodash",
        "backbone": "../libs/backbone",
        "marionette": "../libs/backbone.marionette",
        "marionetteloading": "../libs/marionette.loading",
        "handlebars": "../libs/handlebars",
        "backbone.validateAll": "../libs/plugins/Backbone.validateAll",
        "text": "../libs/plugins/text",
        "jquerycookie": "../libs/plugins/jquery.cookie",
        "formValidation": "../libs/formValidation/formValidation.min",
        "formValidationFoundation": "../libs/formValidation/framework/foundation.min",
        "crypto": "../libs/sha256",
        "foundation": "../libs/foundation.min",
        "modernizr": "../libs/modernizr-latest",
        "fastclick": "../libs/plugins/fastclick",
        "placeholder": "../libs/plugins/placeholder",
        "responsivetable": "../libs/plugins/responsive-tables",
        "spin": "../libs/spin",
        "ladda": "../libs/ladda"
    },
    shim: {
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
        "marionetteloading": ['marionette'],
        "handlebars": {
            "exports": "Handlebars"
        },
        "backbone.validateAll": ["backbone"],
        "foundation": ["jquery", "modernizr", "fastclick", "placeholder"],
        "formValidation": ["jquery"],
        "formValidationFoundation": ["formValidation"],
        "responsivetable": ["foundation"]
    }
});


require([
    "App",
    "routers/AppRouter",
    "controllers/Controller",
    "jquery",
    "jqueryui",
    "jquerycookie",
    "backbone.validateAll",
    "crypto",
    "marionetteloading",
    "foundation",
    "formValidation",
    "formValidationFoundation",
    "responsivetable"
], function (App, AppRouter, Controller) {
    App.appRouter = new AppRouter({
        controller: new Controller()
    });
    App.start();
    $('input').keyup(function(e){
        if(e.keyCode == 13){
            $(this).trigger('enter');
        }
    });
    $(document).foundation();
});