var userCtrl = angular.module('userController', []);

userCtrl
    .controller('register1Ctrl', ['$scope', "registerModel", function ($scope, register) {
        $scope.loading = {};
        $scope.checkAndDo = function (fn, a, b) {
            $("#regForm1").bootstrapValidator('validate');
            if ($("#regForm1").data('bootstrapValidator').isValid()) {
                register.user.email = $scope.email;
                register.user.password = $scope.password;
                fn(a, b);
            }
        }

        $scope.email = register.user.email;
        $scope.password = register.user.password;
        $scope.confirmPassword = register.user.password;

        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#regForm1"));
            form.bootstrapValidator({
//        live: 'disabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    email: {
                        validators: {
                            emailAddress: {
                                message: 'The input is not a valid email address'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required and cannot be empty'
                            }

                        }
                    },
                    confirmPassword: {
                        validators: {
                            identical: {
                                field: 'password',
                                message: 'The two passwords are not the same'
                            }
                        }
                    }
                }
            });
        }, 500);
    }])
    .controller('register2Ctrl', ['$scope', 'DEFAULT_AVATAR', 'registerModel', 'cropImage', function ($scope, DEFAULT_AVATAR, register, cropImage) {
        $scope.imgSrc = cropImage.cropedImg || DEFAULT_AVATAR;
        $scope.next = function() {
            if(cropImage.cropedImg) {
                register.user.head = cropImage.cropedImg;
                $scope.go('user/register_step3', 'slideLeft');
            }
        }
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    cropImage.imgToCrop = evt.target.result;
                    $scope.go('/user/crop', 'slideLeft');
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#input_head')).on('change', handleFileSelect);
        //
    }])
    .controller('register3Ctrl', ['$scope', 'registerModel', 'DEFAULT_AVATAR', '$location', function ($scope, registerModel, DEFAULT_AVATAR, $location) {

        $scope.save = function() {
            $("#regForm3").bootstrapValidator('validate');
            if ($("#regForm3").data('bootstrapValidator').isValid()) {
                registerModel.user.firstname = $scope.fname;
                registerModel.user.lastname = $scope.lname;
                registerModel.user.department = $scope.department;
                registerModel.user.phone = $scope.phone;
                registerModel.register(function(data) {
                    $scope.go("homepage", 'slideRight');
                    $scope.$apply();
                }, function() {

                });
            }
        }

        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#regForm3"));
            form.bootstrapValidator({
//        live: 'disabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    fname: {
                        validators: {
                            notEmpty: {
                                message: 'The first name is required and cannot be empty'
                            }

                        }
                    },
                    lname: {
                        validators: {
                            notEmpty: {
                                message: 'The last name is required and cannot be empty'
                            }

                        }
                    },
                    department: {
                        validators: {
                            notEmpty: {
                                message: 'The department is required and cannot be empty'
                            }

                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: 'The department is required and cannot be empty'
                            }

                        }
                    }
                }
            });
        }, 500);
    }])
    .controller('register4Ctrl', ['$scope', 'cropImage', function ($scope, cropImage) {
        $scope.myImage = cropImage.imgToCrop;
        $scope.myCroppedImage = '';

        $scope.confirm = function () {
            cropImage.cropedImg = $scope.myCroppedImage;
            if (cropImage.imgToCrop && cropImage.cropedImg) {
                $scope.go();
            }
        }
    }])
    .controller('loginCtrl', ['$scope', 'DEFAULT_AVATAR', 'authenticationSvc', '$location', function ($scope, DEFAULT_AVATAR, authService, $location) {
        $scope.imgSrc = DEFAULT_AVATAR;
        $scope.loading = {};
        $scope.login = function () {
            $scope.loading.show = true;
            $("#loginForm").bootstrapValidator('validate');

            authService.login($scope.email, $scope.password, function(data) {
                $scope.loading.show = false;
                if($location.search().url == "/user/login") {
                    $scope.go('homepage', 'slideRight');
                }
                else {
                    $scope.go($location.search().url, 'slideRight');
                }
                $scope.$apply();
            }, function(){
                $scope.loading.show = false;
                $scope.$digest();
            })
        }

        $scope.$evalAsync(function () {
            var form = angular.element(document.querySelector("#loginForm"));
            form.bootstrapValidator({
            live: 'disabled',
                onSuccess: function(e, data) {

                },
                onError: function(e, data) {

                },
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh',
                },
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Please enter your email address'
                            },
                            emailAddress: {
                                message: 'The input is not a valid email address'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'The last name is required and cannot be empty'
                            },
                            remote: {
                                url : 'ajax/user/login/validation',
                                type: "POST",
                                data: {
                                    email: function(validator)
                                    {
                                        return $('#loginForm :input[name="email"]').val();

                                    },
                                    password: function(validator) {
                                        return $('#loginForm :input[name="password"]').val();
                                    }
                                },
                                message: "Ths email or password is wrong.",
                                delay : 1000
                            }
                        }
                    }
                }
            });
        }, 500);
    }])
    .controller('userListCtrl', ['$scope', 'peopleModel', function ($scope, userModel) {
        $scope.listType = 3;
        userModel.getUserList(function (data) {
            $scope.list = data;
            $scope.total = data.length;
            $scope.$digest();
        }, function () {

        })

    }])
    .controller('userInfoCtrl', ['$scope', '$routeParams', 'peopleModel', 'ideaModel', 'projectModel',
        function ($scope, $routeParams, userModel, ideaModel, projectModel) {
        var id = $routeParams.id;

        if (id == +id) {
            $scope.listType = 3;
            $scope.userType = 0;   //others
            $scope.left = "back"
            $scope.fnleft = function() {
                $scope.go();
            }

            userModel.getUser(id, function (data) {
                $scope.userModel = data;
                ideaModel.getIdeasByUser($scope.userModel, function(data) {
                    $scope.list = data;
                    $scope.$digest();
                }, function(){

                });
            });

        } else {
            $scope.listType = 4;
            $scope.userType = 1;   //me
            $scope.name = "Me";
            id = $scope.user.id;
            $scope.userModel = $scope.user;
            $scope.left = "homepage";
            $scope.fnleft = function() {
                $scope.go('homepage', 'slideRight');
            }

            ideaModel.getIdeasByUser($scope.user, function(data) {
                $scope.list = data;
                $scope.$digest();
            }, function(){

            });
        }

        $scope.type = 2;
        $scope.link = "idea";


        //pjModel.get_list(function (data) {
        //    $scope.list = data;
        //}, function () {
        //
        //});
        //
        $scope.changeType = function (i) {
            $scope.type = i;
            if(i == 1) {
                projectModel.getProjectByUser($scope.userModel, function(data) {
                    $scope.list = data;
                    $scope.link = "project";
                    $scope.$digest();
                }, function(){

                });
            }
            else {
                ideaModel.getIdeasByUser($scope.userModel, function(data) {
                    $scope.list = data;
                    $scope.link = "idea";
                    $scope.$digest();
                }, function(){

                });
            }

        }
    }]);