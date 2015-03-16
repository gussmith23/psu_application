define([
    'jquery',
    'backbone',
    'models/Survey'
], function ($, Backbone, Survey) {
    return Backbone.Collection.extend({
        model: Survey,
        url: '/api/survey'
    });
});