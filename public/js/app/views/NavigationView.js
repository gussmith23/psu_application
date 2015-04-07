define([
    'App',
    'marionette',
    'handlebars',
    'text!templates/navigation.hbs'
], function (App, Marionette, Handlebars, template) {

    return Marionette.ItemView.extend({

        template: Handlebars.compile(template),

        ui: {
            "nav/overview": "#navOverview",
            "nav/account": "#navAccount",
            "nav/new-survey": "#navNewSurvey",
            "logoutButton": "#logoutButton"
        },

        events: {
            "click #logoutButton": "logout"
        },

        onRender: function () {
            $(document).foundation();
        },

        onShow: function () {
            $('.menuItem').click(function(evt) {
                $('.toggle-topbar').click();
            });
            this.setActiveTab();
        },

        setActiveTab: function () {
            var _this = this;
            Backbone.history.on("all", function (route, router) {
                _.each(_this.ui, function(el) {
                    if(el.selector.indexOf("nav") > -1) {
                        el.removeClass('active');
                    }
                });
                var activeEl = _this.ui['nav' + window.location.pathname];
                if(activeEl) {
                    activeEl.addClass('active');
                }
                if(window.location.pathname.indexOf('survey/responses/') > -1) {
                    $('#navParent').removeClass('contain-to-grid');
                } else {
                    $('#navParent').addClass('contain-to-grid');
                }
            });
        },

        logout: function () {
            App.vent.trigger('session:logout');
        }

    });
});