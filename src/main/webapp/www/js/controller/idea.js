var ideaCtrl = angular.module('ideaController', []);

ideaCtrl.controller('ideaCreateCtrl', ['$scope', function ($scope) {
        $scope.ideaType = '';
        $scope.selectedAnimal = 1;
        $scope.slides3 = [
            {
                img: "img/category/1giraffe_idea.png",
                id: 1,
                animal: 'Giraffe',
                title: 'Connecting the Dots',
                discription: 'This category allows the players to submit ideas how to better connect our current solutions'
            },

            {
                img: 'img/category/4lion_idea.png',
                id: 2,
                animal: 'Lion',
                title: 'Show Off',
                discription: 'This category allows the players to submit Google like innovation with cutting edge technology'
            },
            {
                img: 'img/category/7monkey_idea.png',
                id: 3,
                animal: 'Eagle',
                title: 'Cloud',
                discription: 'This category allows the players to create Cloud ideas for our next generation solution offerings'
            },
            {
                img: 'img/category/10eagle_idea.png',
                id: 4,
                animal: 'Monkey',
                title: "Wild Card",
                discription: 'This category can be a catchall.  We could also let the employees to define what this is'
            }];
    }])
    .controller('ideaCreate1Ctrl', ['$scope', function ($scope) {
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
    .controller('ideaCreate2Ctrl', ['$scope', function ($scope) {
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
    .controller('ideaCreate3Ctrl', ['$scope', function ($scope) {
        $scope.discription = "";
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm3").bootstrapValidator('validate');
            if ($("#createForm3").data('bootstrapValidator').isValid()) {
                fn(a, b);
            }
        }


        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#createForm3"));
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
    .controller('ideaCreate4Ctrl', ['$scope', 'ideaModel', function ($scope, ideaModel) {
        $scope.idea=ideaModel.idea;

        $scope.remove=function(idx){
            $scope.idea.imgsSrc.splice(idx,1);
        }

        $scope.add=function(file){
            console.log(file)
        }

        $scope.change=function(e){
            var file=e.target.files[0];
            if(!file){
                return;
            }
            $scope.idea.files.push(file);
            $scope.idea.imgsSrc.push(URL.createObjectURL(file))
            $scope.$digest()
        }
    }])
    .controller('ideaListCtrl',['$scope','ideaListModel',function($scope,list){
        $scope.ideaList=list.get();
        $scope.listType=1;
        $scope.$evalAsync(function(){
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
    .controller('ideaDetailCtrl', ['$scope', 'ideaModel', '$routeParams', function ($scope, idea, $routeParams) {
        $scope.idea = idea.get();
    }])
    .controller('ideaPreviewCtrl',['ideaModel','$scope', function(ideaM,$scope){
        $scope.idea= ideaM.get();
    }])
