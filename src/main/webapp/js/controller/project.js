/**
 * Created by I309891 on 1/23/2016.
 */
var projectCtrl = angular.module('projectController', []);

projectCtrl.controller('projectListCtrl', ['$scope', 'projectModel', function ($scope, projectModel) {
    projectModel.getProjectList(function(data){
        $scope.projectList = data;
        $scope.$digest();
    }, function(){

    })
    $scope.listType = 2;


    $scope.like = function(pid) {
        projectModel.like(pid, function(data) {
            projectModel.getProjectList(function(data) {
                $scope.projectList = data;
                $scope.$digest();
            });
        }, function () {

        })
    }


    $scope.like = function(projectid) {
        projectModel.like(projectid, function(data) {
            projectModel.getProjectList(function(data) {
                $scope.projectList = data;
                $scope.$digest();
            });
        }, function () {

        })
    }
    

    $scope.dateFilter = function (item) {
            if($scope.minDate && moment(item.createDate, "YYYY-MM-DD") <  moment($scope.minDate, "YYYY-MM-DD")) {
                return false;
            }
            if($scope.maxDate && moment(item.createDate, "YYYY-MM-DD") > moment($scope.maxDate, "YYYY-MM-DD")) {
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
}])

projectCtrl.controller('projectCreate1Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {
        $scope.project = projectModel.getProject();
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
    .controller('projectCreate2Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {
        $scope.project = projectModel.getProject();
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
    .controller('projectCreate3Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {
        $scope.project = projectModel.getProject();
        $scope.checkAndDo = function (fn, a, b) {
            $("#createForm3").bootstrapValidator('validate');
            if($scope.project.startdate && $scope.project.todate) {
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
                    start: {
                        validators: {
                            notEmpty: {
                                message: 'Please Select a Date'
                            }
                        }
                    },
                    end: {
                        validators: {
                            notEmpty: {
                                message: 'Please Select a Date'
                            }
                        }
                    }
                }
            });
        }, 500);

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
                $scope.project.startdate = e.date.format('YYYY-MM-DD');
                $scope.$apply();
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
                $scope.project.todate = e.date.format('YYYY-MM-DD');
                $scope.$apply();
            });
        }, 500);


    }])
    .controller('projectCreate4Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {
        $scope.items = [{
            id: 0,
            label: 'Not Start',
        },{
            id: 1,
            label: 'Design Finished',
        }, {
            id: 2,
            label: 'Ready for Demo',
        }];
        if(projectModel.getProject().status) {
            $scope.selected = $scope.items[projectModel.project.status];
        }
        else {
            $scope.selected = $scope.items[0];
        }

        $scope.checkAndDo = function (fn, a, b) {
            projectModel.getProject().status = $scope.selected.id;
            fn(a, b);
        }
    }])
    .controller('projectCreate5Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {

    $scope.project = projectModel.getProject();
    if(!$scope.project.image) {
        $scope.project.image = [];
    }

    $scope.remove = function (idx) {
        $scope.project.image.splice(idx, 1);
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
                $scope.project.image.push(evt.target.result);
            });
        };
        reader.readAsDataURL(file);
    }
}]).controller('projectCreate6Ctrl', ['$scope', 'projectModel', function ($scope, projectModel) {
    $scope.users = projectModel.getUsers();
}]).controller('ProjectAddUserCtrl', ['$scope', 'projectModel', 'peopleModel', function ($scope, projectModel, userModel) {
    userModel.getUserList(function (data) {
        $scope.list = data;
        $scope.total = data.length;
        $scope.$digest();
    }, function () {

    })

    var selectNum = 0;
    $scope.keyword = "";
    var selectId = [];
    var selectList = [];

    $scope.change = function change(user) {
        if(user.selected) {
            selectNum = selectNum - 1;
            var index = selectId.indexOf(user.id);
            selectId.splice(index, 1);
            selectList.splice(index, 1);
        }
        else {
            selectNum = selectNum + 1;
            selectId.push(user.id);
            selectList.push(user);
        }
        if(selectNum == 0) {
            $scope.number = ""
        }
        else {
            $scope.number = "( " + selectNum + " )";
        }
    }

    $scope.add = function() {
        projectModel.addPeople(selectId, selectList);
        $scope.go();
    }
}]).controller('ProjectPreviewCtrl', ['$scope', 'projectModel', 'peopleModel', function ($scope, projectModel, userModel) {
    $scope.project = projectModel.getProject();
    $scope.users = projectModel.getUsers();
    $scope.loading = {};
    $scope.generateProject = function(){
        if($scope.loading.rightBt) {
            return;
        }
        $scope.loading.rightBt = true;
        projectModel.generateProject(function(data) {
            $scope.go("homepage", "slideRight");
            $scope.loading.rightBt = false;
            $scope.$apply();
        }, function(){
            $scope.loading.rightBt = false;
            $scope.$apply();
        });
    }
}])
    .controller('projectDetailCtrl', ['$scope', 'projectModel', '$routeParams', function ($scope, projectModel, $routeParams) {
        var id = $routeParams.id;
        $scope.status = {};
        projectModel.getPJ(id, function(data) {
            $scope.project = data;
            $scope.status.selected = $scope.items[$scope.project.status];
            $scope.$digest();
        }, function(){

        });

        var project = projectModel.getProject();
        if(project.addUser) {
            if(project.member.length != 0) {
                projectModel.addMember(id, function(){
                    projectModel.getMember(id,
                        function(data){
                            $scope.users = data;
                            $scope.$apply();
                        },
                        function(){

                        });
                }, function(){

                });
            }
        }
        else{
            projectModel.clear();
            project = projectModel.getProject();
            project.addUser = true;
        }


        $scope.items = [{
            id: 0,
            label: 'Not Start',
        },{
            id: 1,
            label: 'Design Finished',
        }, {
            id: 2,
            label: 'Ready for Demo',
        }];

        $scope.changeStatus = function() {
            $scope.project.status = $scope.status.selected.id;
            projectModel.updateStatus($scope.project);
        }

        $scope.like = function() {
            projectModel.like($scope.project.id, function(data) {
                projectModel.getPJ(id, function(data) {
                    $scope.project = data;
                    $scope.$digest();
                });
            }, function () {

            })
        };

        projectModel.getComments(id, function(data) {
            $scope.comments = data;
            $scope.$digest();
        }, function() {

        })

        projectModel.getMember(id,
            function(data){
                $scope.users = data;
                $scope.$apply();
            },
            function(){

            });

        $scope.myComment = "";

        $scope.addOk = function() {
            var text = $scope.myComment;
            if(text == "") {
                return;
            }

            projectModel.comment(text, id, function(data){
                $scope.myComment = "";
                $scope.showAddComment=false;
                $scope.$apply();
                projectModel.getComments(id, function(data) {
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
