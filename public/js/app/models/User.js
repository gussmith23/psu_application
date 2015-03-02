define([
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                id: null,
                username: null,
                email: null,
                firstName: null,
                lastName: null,
                createdAt: null,
                updatedAt: null
            },
            urlRoute: '/api/user',
            url: function () {
                return this.urlRoute;
            }
        });
    });