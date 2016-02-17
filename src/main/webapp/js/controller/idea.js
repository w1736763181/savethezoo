var ideaCtrl = angular.module('ideaController', []);

ideaCtrl.controller('ideaCreateCtrl', ['$scope','createIdea', function ($scope, ideaService) {
        var idea = ideaService.getIdea();
        idea.uid = $scope.user.id;
        $scope.ideaType = '';
        $scope.selectedAnimal = 1;
        $scope.categoryList = ideaService.getCategoryList();
        $scope.$on("cagtegoryList:fetched", function(event, data) {
            $scope.categoryList = data;
        });

        $scope.selectAndGo = function(){
            idea.category = $scope.categoryList[$scope.selectedAnimal].animal;
            $scope.go("idea/create_step1", "slideLeft");
        }
    }])
    .controller('ideaCreate1Ctrl', ['$scope', 'createIdea', function ($scope, ideaService) {
        $scope.title = "";
        var idea = ideaService.getIdea();
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm").bootstrapValidator('validate');
            if ($("#createForm").data('bootstrapValidator').isValid()) {
                idea.title = $scope.title;
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
    .controller('ideaCreate2Ctrl', ['$scope', 'createIdea', function ($scope, ideaService) {
        var idea = ideaService.getIdea();
        $scope.description = "";
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm2").bootstrapValidator('validate');
            if ($("#createForm2").data('bootstrapValidator').isValid()) {
                idea.description = $scope.description;
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
    .controller('ideaCreate3Ctrl', ['$scope', 'createIdea', function ($scope, ideaService) {
        var idea = ideaService.getIdea();
        $scope.businessImpact = "";
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm3").bootstrapValidator('validate');
            if ($("#createForm3").data('bootstrapValidator').isValid()) {
                idea.businessImpact = $scope.businessImpact;
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
    .controller('ideaCreate4Ctrl', ['$scope', 'createIdea', function ($scope, ideaService) {
        $scope.idea = ideaService.getIdea();
        $scope.idea.image=[];
        $scope.remove=function(idx){
            $scope.idea.image.splice(idx,1);
        }

        $scope.submit = ideaService.submit();

        $scope.add=function(file){
            console.log(file)
        }

        $scope.change=function(e){
            var file=e.target.files[0];
            if(!file){
                return;
            }
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.idea.image.push(evt.target.result);
                });
            };
            reader.readAsDataURL(file);
        }
    }])
    .controller('ideaListCtrl',['$scope','ideaListModel',function($scope,list){
        list.get(function(data) {
            $scope.ideaList = data;
            $scope.$digest();
        }, function(){});

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
        idea.get($routeParams.id,function(data){
            $scope.idea = data;
            $scope.$digest();
        },function(){});
    }])
    .controller('ideaPreviewCtrl',['ideaModel','$scope', function(ideaM,$scope){
        $scope.idea= ideaM.get();
    }])
