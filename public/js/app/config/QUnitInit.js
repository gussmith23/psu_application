require.config({
    baseUrl: "/js/app",
    urlArgs: "bust=" + (new Date()).getTime(),
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
        "sweetalert": "../libs/plugins/sweet-alert",
        "QUnit": "../libs/qunit-1.17.1"
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
        "backbone.validateAll": ["backbone"],
        "QUnit": {
            exports: "QUnit",
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

// require the unit tests.
require([
    "QUnit",
    "tests/DummyTest",
    "tests/ViewTests",
    "jquery",
    "jqueryui",
    "jquerycookie",
    "bootstrap",
    "bootstrapValidator",
    "backbone.validateAll",
    "bootstrap-datepicker",
    "crypto"
], function (QUnit, DummyTest, ViewTests) {

    // run the tests.
    ViewTests.run();

    // start QUnit.
    QUnit.load();
    QUnit.start();

});