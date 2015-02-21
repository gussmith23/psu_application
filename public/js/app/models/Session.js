define([
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                access_token: null,
                tokenEndpoint: '/api/token',
                revokeEndpoint: '/api/revoke'
            },
            initialize: function () {
                return this.load();
            },
            isAuthenticated: function () {
                this.load();
                return Boolean(this.get('access_token'));
            },
            getToken: function () {
                this.load();
                return this.get('access_token');
            },
            revokeToken: function () {
                $.removeCookie('access_token');
                return this.set({access_token: null});
            },
            setToken: function (data) {
                this.set({access_token: data['access_token']});
                return $.cookie('access_token', this.get('access_token'));
            },
            load: function () {
                return this.set({access_token: $.cookie('access_token')});
            },
            authenticatedRoute: function (routeCallback) {
                if(this.isAuthenticated()) return routeCallback;
                return window.location.hash = "";
            },
            unauthenticatedRoute: function (routeCallback) {
                if(this.isAuthenticated()) return window.location.hash = "#overview";
                return routeCallback;
            }
        });
    });