define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    return Backbone.Model.extend({
        urlRoute: '/api/user',
        url: function () {
            return this.urlRoute;
        }
    });
});