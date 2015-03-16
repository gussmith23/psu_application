/**
 * Created by mporter on 3/10/15.
 */
define([
    'views/LoginView',
    'views/RegisterView',
    'views/WelcomeView',
    'views/OverviewView'
], function (LoginView, RegisterView, WelcomeView, OverviewView) {
    return {
        run: function () {

            module("Marionette.View Test");

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

                // test some different inputs
                view.ui.identification[0].value = 'testaccount';
                view.ui.password[0].value = 'password';
                equal(view.ui.identification[0].value, "testaccount", "identification input should be 'testaccount'");
                equal(view.ui.password[0].value, "password", "password input should be 'password'");

                // test bad login
                view.ui.identification[0].value = 'badaccount';
                view.ui.password[0].value = 'badpassword';
                view.login();
                equal(view.session.isAuthenticated(), false, "bad login OK");

                // test good login
                view.ui.identification[0].value = "testaccount";
                view.ui.password[0].valu = "password";
                view.login();
                equal(view.session.isAuthenticated(), true, "good login OK");
                this.session.revokeToken();
                equal(view.session.isAuthenticated(), false, "logout OK");

                // remove view when done
                view.remove();
            });

            test('RegisterView', function () {
                var view = new RegisterView();
                view.render();
                view.onShow();

                //default setup after page renders
                equal(view.el.tagName.toLowerCase(), "div", "should render RegisterView");
                equal(_.size(view.ui), 6, "should contain 6 ui elements");

                //test some input


                // remove view when done
                view.remove();

            });

            test('OverviewView', function () {
                var view = new OverviewView();
                view.render();
                //view.onShow();

                equal(view.el.tagName.toLowerCase(), "div", "should render OverviewView");
                equal(view.getSurveys()[0].id, 1, "Survey at index 0's id is 1");

            });


        }
    }
});