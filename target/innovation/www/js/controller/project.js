/**
 * Created by I309891 on 1/23/2016.
 */
var projectCtrl = angular.module('projectController', []);

projectCtrl.controller('projectListCtrl', ['$scope', 'projectListModel', function ($scope, list) {
    $scope.projectList = list.get();
    $scope.listType = 2;

    $scope.$evalAsync(function () {
        $('#datetimepicker6').datetimepicker({
                format: 'YYYY.MM.DD'
            }
        );
        $('#datetimepicker7').datetimepicker({
            format: 'YYYY.MM.DD',
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });
    }, 500);
}])

projectCtrl.controller('projectCreate1Ctrl', ['$scope', function ($scope) {
        $scope.title = "";
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm").bootstrapValidator('validate');
            if ($("#createForm").data('bootstrapValidator').isValid()) {
                fn(a, b);
            }
        }


        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#createForm"));
            form.bootstrapValidator({
//        live: 'disabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    title: {
                        validators: {
                            notEmpty: {
                                message: 'The title is required and cannot be empty'
                            }
                        }
                    }
                }
            });
        }, 500);
    }])
    .controller('projectCreate2Ctrl', ['$scope', function ($scope) {
        $scope.discription = "";
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm2").bootstrapValidator('validate');
            if ($("#createForm2").data('bootstrapValidator').isValid()) {
                fn(a, b);
            }
        }


        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#createForm2"));
            form.bootstrapValidator({
//        live: 'disabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    description: {
                        validators: {
                            notEmpty: {
                                message: 'The description is required and cannot be empty'
                            }
                        }
                    }
                }
            });
        }, 500);
    }])
    .controller('projectCreate3Ctrl', ['$scope', function ($scope) {
        $scope.discription = "";
        $scope.checkAndDo = function (fn, a, b) {
                fn(a, b);
        }


        $scope.$evalAsync(function () {

            $('#datetimepicker6').datetimepicker({
                    format: 'YYYY.MM.DD'
                }
            );
            $('#datetimepicker7').datetimepicker({
                format: 'YYYY.MM.DD',
                useCurrent: false //Important! See issue #1075
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
            });
        }, 500);

    }])
    .controller('projectCreate4Ctrl', ['$scope', 'ideaModel', function ($scope, ideaModel) {
        $scope.checkAndDo = function (fn, a, b) {
            fn(a, b);
        }
    }])
    .controller('projectCreate5Ctrl', ['$scope', 'ideaModel', function ($scope, ideaModel) {
        $scope.idea = ideaModel.idea;

        $scope.remove = function (idx) {
            $scope.idea.imgsSrc.splice(idx, 1);
        }

        $scope.add = function (file) {
            console.log(file)
        }

        $scope.change = function (e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            $scope.idea.files.push(file);
            $scope.idea.imgsSrc.push(URL.createObjectURL(file))
            $scope.$digest()
        }
    }])