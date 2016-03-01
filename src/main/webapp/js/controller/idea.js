var ideaCtrl = angular.module('ideaController', []);

ideaCtrl.controller('ideaCreateCtrl', ['$scope', 'createIdea', function ($scope, ideaService) {
        var idea = ideaService.getIdea();
        idea.uid = $scope.user.id;
        $scope.ideaType = '';
        $scope.selectedAnimal = 1;
        $scope.categoryList = ideaService.getCategoryList(
            function (data) {
                $scope.categoryList = data;
                $scope.$digest();
            },
            function (msg) {

            }
        );


        $scope.selectAndGo = function () {
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
        $scope.idea.image = [];
        $scope.remove = function (idx) {
            $scope.idea.image.splice(idx, 1);
        }

        $scope.add = function (file) {
            console.log(file)
        }

        $scope.change = function (e) {
            var file = e.target.files[0];
            if (!file) {
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
    .controller('ideaListCtrl', ['$scope', 'ideaModel', 'projectModel', function ($scope, ideaModel, projectModel) {
        ideaModel.getIdeaList(function(data) {
            $scope.ideaList = data;
            $scope.$digest();
        });
        $scope.listType = 1;
        
        $scope.dateFilter = function (item) {
            if($scope.minDate && moment(item.createdate, "YYYY-MM-DD") <  moment($scope.minDate, "YYYY-MM-DD")) {
                return false;
            }
            if($scope.maxDate && moment(item.createdate, "YYYY-MM-DD") > moment($scope.maxDate, "YYYY-MM-DD")) {
                return false;
            }
            return true;
        }

        $scope.$evalAsync(function(){
            $('#datetimepicker6').datetimepicker({
                    format: 'YYYY.MM.DD',
                    useCurrent: false,
                    widgetPositioning: {
                        horizontal: 'left',
                        vertical: 'bottom'
                    }
                }
            );
            $('#datetimepicker7').datetimepicker({
                format: 'YYYY.MM.DD',
                useCurrent: false,
                widgetPositioning: {
                horizontal: 'right',
                    vertical: 'bottom'
                }
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
                $scope.minDate = e.date.format('YYYY-MM-DD');
                $scope.$apply();
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
                $scope.maxDate = e.date.format('YYYY-MM-DD');
                $scope.$apply();
            });
        }, 500);


        $scope.like = function(item) {
            ideaModel.like(item.id, function(data) {
                item.voting = 'vote';
                item.likes = item.likes + 1;
                $scope.$digest();
                //ideaModel.getIdeaList(function(data) {
                //    $scope.ideaList = data;
                //    $scope.$digest();
                //});
            }, function () {
                
            })
        }

        $scope.approve = function(idea) {
            ideaModel.approve(idea, function(data) {
                ideaModel.getIdeaList(function(data) {
                    $scope.ideaList = data;
                    $scope.$digest();
                });
            }, function () {

            })
        }

        $scope.generateProject = function(idea) {
            projectModel.clear();
            var project = projectModel.getProject();
            project.createdate = moment().format("YYYY.MM.DD");
            project.category = idea.category;
            projectModel.setIdea(idea);
            $scope.go('/project/create_step1','slideLeft');
        }
    }])
    .controller('ideaDetailCtrl', ['$scope', 'ideaModel', '$routeParams', function ($scope, ideaModel, $routeParams) {
        var id = $routeParams.id;
        ideaModel.getIdea(id, function(data) {
            $scope.idea = data;
            $scope.$digest();
        }, function(){

        });

        $scope.like = function() {
            ideaModel.like($scope.idea.id, function(data) {
                ideaModel.getIdea(id, function(data) {
                    $scope.idea = data;
                    $scope.$digest();
                });
            }, function () {

            })
        };

        ideaModel.getComments(id, function(data) {
            $scope.comments = data;
            $scope.$digest();
        }, function() {

        })

        $scope.myComment = "";

        $scope.addOk = function() {
            var text = $scope.myComment;
            if(text == "") {
                return;
            }
            ideaModel.comment(text, id, function(data){
                $scope.myComment = "";
                $scope.showAddComment=false;
                $scope.$apply();
                ideaModel.getComments(id, function(data) {
                    $scope.comments = data;
                    $scope.$digest();
                }, function() {

                })
            }, function(){

            });
        }

        $scope.addCancel = function() {
            $scope.myComment = "";
            $scope.showAddComment=false;
        }
    }])
    .controller('ideaPreviewCtrl', ['createIdea', '$scope', function (ideaM, $scope) {
        $scope.idea = ideaM.getIdea();
        $scope.loading = {}
        $scope.submit =
            function () {
                if($scope.loading.rightBt) {
                    return;
                }
                $scope.loading.rightBt = true;
                ideaM.submit(function (data) {
                    $scope.go("homepage", "slideRight");
                    $scope.loading.rightBt = false;
                    $scope.$apply();
                }, function() {
                    $scope.loading.rightBt = false;
                    $scope.$apply();
                });
            };
    }])
