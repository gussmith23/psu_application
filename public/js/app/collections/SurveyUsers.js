define([
    'jquery',
    'backbone',
    'models/User'
], function ($, Backbone, User) {
    return Backbone.Collection.extend({
        model: User,
        initialize: function (opts) {
            this.survey_id = opts.survey_id;
        },
        url: function () {
            return '/api/survey/users/' + this.survey_id;
        }
    });
});