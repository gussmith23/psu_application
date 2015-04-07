define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/survey_ist.hbs'
    ],
    function (App, Marionette, Handlebars, template) {

        return Marionette.ItemView.extend({

            template: Handlebars.compile(template),

            initialize: function () {
                //console.log(this.model);
            },

            ui: {
                "clearButton": "#clear",
                "submitButton": "#submit",
                "surveyForm": "#surveyForm",
                "emailField": "#email",
                "firstNameField": "#firstName",
                "middleInitialField": "#middleInitial",
                "lastNameField": "#lastName",
                "streetAddressField": "#address",
                "cityField": "#city",
                "stateField": "#state",
                "zipCodeField": "#zipCode",
                "telephoneField": "#telephone",
                "dateOfBirthField": "#birthdate",
                "highSchoolNameField": "#highSchoolName",
                "highSchoolYearField": "#highSchoolYear",
                "otherInformationField": "#otherInformation"
            },

            events: {
                "change @ui.surveyForm": "checkAttributes",
                "click @ui.submitButton": "submitResponse"
            },

            onShow: function () {
                $('#birthdate').fdatepicker();
            },

            onDestroy: function () {

            },

            submitResponse: function () {

                var _this = this;

                var ethnicityField = $("input:radio[name='ethnicity']:checked").val();
                if(document.getElementById('surveyForm').ethnicity.value == 'Other') {
                    ethnicityField = $('#ethnicityOther').val();
                }

                var interestIST = [];
                _.each($("input:checkbox[name='interestIST']:checked"), function(el) {
                    interestIST.push(el.value);
                });

                var interestSRA = [];
                _.each($("input:checkbox[name='interestSRA']:checked"), function(el) {
                    interestSRA.push(el.value);
                });

                var data = {
                    'email': this.ui.emailField[0].value,
                    'first_name': this.ui.firstNameField[0].value,
                    'middle_initial': this.ui.middleInitialField[0].value,
                    'last_name': this.ui.lastNameField[0].value,
                    'street_address': this.ui.streetAddressField[0].value,
                    'city': this.ui.cityField[0].value,
                    'state': this.ui.stateField[0].value,
                    'zip_code': this.ui.zipCodeField[0].value,
                    'telephone': this.ui.telephoneField[0].value,
                    'date_of_birth': this.ui.dateOfBirthField[0].value,
                    'gender': $("input:radio[name='genderRadio']:checked").val(),
                    'high_school_name': this.ui.highSchoolNameField[0].value,
                    'high_school_year': this.ui.highSchoolYearField[0].value,
                    'ethnicity': ethnicityField,
                    'interest_undergrad_ist': JSON.stringify(interestIST),
                    'interest_undergrad_sra': JSON.stringify(interestSRA),
                    'interest_graduate': $("input:radio[name='interestGraduate']:checked").val(),
                    'other_information': this.ui.otherInformationField[0].value
                };

                console.log(data);

                $.ajax({
                    type: 'POST',
                    data: data,
                    url: '/api/survey/response/' + _this.model.get('survey_permalink'),
                    success: function(res) {
                        console.log(res);
                        alert("Your response has been received. Thank you!");
                        window.location.reload();
                    },
                    error: function(err) {
                        alert("Something went wrong. Please contact an administrator.");
                    }
                })

            },

            checkAttributes: function () {
                if(document.getElementById('surveyForm').ethnicity.value == 'Other') {
                    document.getElementById('ethnicityOtherContainer').style.display = 'block';
                } else {
                    document.getElementById('ethnicityOtherContainer').style.display = 'none';
                }
            }

        });

    });