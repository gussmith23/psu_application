/**
 * Created by mporter on 3/10/15.
 */
define([
    'views/LoginView',
    'views/RegisterView',
    'views/WelcomeView'
], function (LoginView, RegisterView, WelcomeView) {
    return {
        run: function () {

            module("Marionette.View Tests", {});

            // nothing much to test with WelcomeView
            test('WelcomeView', function () {
                var view = new WelcomeView();
                view.render();
                equal(view.el.tagName.toLowerCase(), "div", "should render WelcomeView");
                equal(view.$('h2').text(), "Welcome!", "page title set");
                view.remove();
            });


            test('LoginView', function () {
                var view = new LoginView();
                view.render();
                view.onShow(); // need to call on show so that bootstrap validator runs

                // default setup right after page renders
                equal(view.el.tagName.toLowerCase(), "div", "should render LoginView");
                equal(_.size(view.ui), 3, "should contain 3 ui elements");

                // change some things
                view.ui.identification[0].value = 'testaccount';
                view.ui.password[0].value = 'password';

                // test to make sure the changes occurred
                equal(view.ui.identification[0].value, "testaccount", "identification input should be 'testaccount'");
                equal(view.ui.password[0].value, "password", "password input should be 'password'");

                // remove view when done
                view.remove();
            });


        }
    }
});