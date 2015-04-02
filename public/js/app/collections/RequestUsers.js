define([
    'jquery',
    'backbone',
    'models/User'
], function ($, Backbone, User) {
    return Backbone.Collection.extend({
        model: User,
        url: function () {
            return '/api/users/role/request';
        }
    });
});