define([
        'jquery',
        'backbone',
        'models/User'
    ],
    function ($, Backbone, User) {
        return Backbone.Collection.extend({
            model: User,
            url: '/api/user'
        });
    });