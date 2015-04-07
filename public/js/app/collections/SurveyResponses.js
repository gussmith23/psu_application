define([
    'jquery',
    'backbone',
    'models/Response'
], function ($, Backbone, Response) {
    return Backbone.Collection.extend({
        model: Response,
        initialize: function (opts) {
            this.survey_id = opts.survey_id;
        },
        url: function () {
            return '/api/survey/responses/' + this.survey_id;
        }
    });
});