define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    return Backbone.Model.extend({
        urlRoute: '/api/survey/',
        url: function () {
            return this.urlRoute + this.id;
        }
    });
});