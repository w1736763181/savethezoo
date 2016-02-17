var ideaCtrl = angular.module('ideaController', []);

ideaCtrl.controller('ideaCreateCtrl', ['$scope','ideaModel', 'categoryModel', function ($scope, ideaService, cate) {
        var idea = ideaService.getIdea();
		
        $scope.ideaType = '';
        $scope.selectedAnimal = 1;
        cate.getCategoryList(function(d){
			$scope.categoryList = d;
		});
		
        $scope.selectAndGo = function(){
            idea.category = $scope.categoryList[$scope.selectedAnimal].animal;
            $scope.go("idea/create_step1", "slideLeft");
        }
    }])
    .controller('ideaCreate1Ctrl', ['$scope', 'ideaModel', function ($scope, ideaService) {
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
    .controller('ideaCreate2Ctrl', ['$scope', 'ideaModel', function ($scope, ideaService) {
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
    .controller('ideaCreate3Ctrl', ['$scope', 'ideaModel', function ($scope, ideaService) {
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
    .controller('ideaCreate4Ctrl', ['$scope', 'ideaModel', 'userModel', function ($scope, ideaService, user) {
        $scope.idea = ideaService.getIdea();
		
        $scope.remove=function(idx){
            $scope.idea.image.splice(idx,1);
        }

        $scope.submit = function(){
			ideaService.submit(user.user.id,function(){	
			});
		}

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
    .controller('ideaListCtrl',['$scope','ideaModel', 'userModel',function($scope,idea,user){
		var id=user.user.id;
		//not login and id=0;
		if(id==undefined){
			id=0;
		}
		idea.get_list(id,function(data){
			$scope.ideaList=data;	
		},function(err){
			
		});
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
