/**
 * Scheduler view model
 */

var app = app || {};

app.Scheduler = (function () {
    'use strict'

    // Scheduler model
    var SchedulerModel = (function () {

        var schedulerModel = {

            id: 'Id',
            fields: {
                Title: {
                    field: ’Title’,
                    defaultValue: ‘No title’
                },
                Start: {
                    field: ‘Start’,
                    defaultValue: new Date()
                },
                End: {
                    field: ‘End’,
                    defaultValue: new Date()
                },
                StartTimezone: {
                    field: ’StartTimezone’,
                    defaultValue: new Date()
                },
                EndTimezone: {
                    field: ‘EndTimezone’,
                    defaultValue: new Date()
                },
                Description: {
                    field: ‘Description’,
                    defaultValue: ‘’
                },
                RecurrenceId: {
                    field: ‘RecurrenceId’,
                    defaultValue: null
                },
                    RecurrenceRule: {
                    field: ‘RecurrenceRule’,
                    defaultValue: ‘’
                },
                RecurrenceException: {
                    field: ‘RecurrenceException’,
                    defaultValue: ‘’
                },
                IsAllDay: {
                    field: ‘IsAllDay’,
                    defaultValue: false
                },
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                } : {
                    DisplayName: 'Anonymous',
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // Scheduler data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var SchedulerDataSource = new kendo.data.SchedulerDataSource({
            type: 'everlive',
            schema: {
                model: schedulerModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Scheduler'
            },
        });

        return {
            Scheduler: SchedulerDataSource
        };

    }());

    // Scheduler view model
    var SchedulerViewModel = (function () {

        // Navigate to schedulerView When some scheduler is selected
        var schedulerSelected = function (e) {

            app.mobileApp.navigate('views/schedulerView.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {

            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };

        return {
            Scheduler: SchedulerModel.Scheduler,
            logout: logout
        };

    }());

    return SchedulerViewModel;

}());
