define([
        'App',
        'marionette',
        'handlebars',
        'text!templates/responses.hbs',
        'collections/SurveyResponses'
    ],
    function (App, Marionette, Handlebars, template, SurveyResponses) {

        return Marionette.LayoutView.extend({

            template: Handlebars.compile(template),

            regions: {
                tableRegion: "#tableRegion"
            },

            ui: {
                deleteRowsButton: "#deleteRows",
                exportButton: "#exportAll"
            },

            events: {
                "click @ui.deleteRowsButton": "deleteRows",
                "click @ui.exportButton": "exportAll"
            },

            initialize: function (opts) {

                this.survey_id = opts.survey_id;

                this.responsesCollection = new SurveyResponses({ survey_id: opts.survey_id });

                this.columns = [
                    {
                        name: '',
                        cell: Backgrid.Extension.SelectRowCell,
                        headerCell: Backgrid.Extension.SelectAllHeaderCell
                    },
                    {
                        name: "id",
                        label: "ID",
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'email',
                        label: 'Email',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'first_name',
                        label: 'First name',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'middle_initial',
                        label: 'Middle Initial',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'gender',
                        label: 'Gender',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'date_of_birth',
                        label: 'Date of Birth',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'ethnicity',
                        label: 'Ethnicity',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'street_address',
                        label: 'Street Address',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'city',
                        label: 'City',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'state',
                        label: 'State',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'high_school_name',
                        label: 'High School Name',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'high_school_year',
                        label: 'High School Year',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'interest_undergrad_ist',
                        label: 'Interests IST',
                        editable: false,
                        cell: Backgrid.StringCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var formatted = this.formatter.fromRaw(model.get(this.column.get("name")), model);
                                formatted = formatted.replace(/\[/g, '').replace(/\]/g, '').replace(/\"/g, '').replace(/\,/g, ', ');
                                this.$el.text(formatted);
                                this.delegateEvents();
                                return this;
                            }
                        })
                    },
                    {
                        name: 'interest_undergrad_sra',
                        label: 'Interests SRA',
                        editable: false,
                        cell: Backgrid.StringCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var formatted = this.formatter.fromRaw(model.get(this.column.get("name")), model);
                                formatted = formatted.replace(/\[/g, '').replace(/\]/g, '').replace(/\"/g, '').replace(/\,/g, ', ');
                                this.$el.text(formatted);
                                this.delegateEvents();
                                return this;
                            }
                        })
                    },
                    {
                        name: 'interest_graduate',
                        label: 'Graduate Interests',
                        editable: false,
                        cell: 'string'
                    },
                    {
                        name: 'other_information',
                        label: 'Other Information',
                        editable: false,
                        cell: 'string'
                    }
                ];

                this.responsesGrid = new Backgrid.Grid({
                    columns: this.columns,
                    collection: this.responsesCollection
                });

                this.responsesCollection.fetch({
                    reset: true,
                    success: function (collection, response, options) {
                        $('input[type="checkbox"]').css({
                            'margin': '0'
                        });
                        $('input[type="checkbox"]:first').css({
                            'margin': '1.5rem 0 0.3rem 0'
                        });
                    }
                });

                this.model.fetch({
                    reset: true,
                    success: function (model, response, options) {
                        $('#surveyName').append('<a href="/survey/manage/' + model.get('id') + '">' + model.get('survey_name') + '</a>');
                    }
                });

            },

            onRender: function () {
                this.tableRegion.show(this.responsesGrid);
                this.responsesGrid.clearSelectedModels();
            },

            onShow: function () {
                var windowHeight = $(document).height();
                var diff = windowHeight - 167;
                $('#tableRegion').css({
                    'min-height':  diff + 'px'
                });
                $("#toolcontainer").sticky({topSpacing:0});
            },

            deleteRows: function () {
                if(!confirm('Are you sure you wish to remove the selected rows?')) return;
                var _this = this;
                var selectedModels = this.responsesGrid.getSelectedModels();
                var idArr = [];
                _.each(selectedModels, function (model) {
                    idArr.push(model.get('id'));
                    //_this.responsesCollection.remove({ id: model.get('id')});
                });
                $.ajax({
                    type: 'DELETE',
                    url: '/api/survey/responses/' + _this.model.get('id'),
                    data: { responses_id: idArr },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                    },
                    success: function (res) {
                        _.each(idArr, function (id) {
                            _this.responsesCollection.remove({ id: id });
                        });
                        _this.responsesGrid.clearSelectedModels();
                    },
                    error: function (err) {
                        console.error(err.responseText);
                    }
                });
            },

            exportAll: function () {
                var url = '/api/survey/export/' + this.model.get('id');
                $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Authorization', 'Basic ' + $.cookie('access_token'));
                    },
                    success: function (res) {
                        //myWindow = window.open("data:text/csv," + res, "_blank");
                        //myWindow.focus();
                    }
                });
            }

        });

    });