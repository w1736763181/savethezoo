var userCtrl = angular.module('userController', []);

userCtrl
    .controller('register1Ctrl', ['$scope', "userModel", function ($scope, register) {
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
    .controller('register2Ctrl', ['$scope', 'DEFAULT_AVATAR', 'userModel', 'cropImage', function ($scope, DEFAULT_AVATAR, register, cropImage) {
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
    .controller('register3Ctrl', ['$scope', 'userModel', 'DEFAULT_AVATAR', '$location', function ($scope, userModel, DEFAULT_AVATAR, $location) {

        $scope.save = function() {
            $("#regForm3").bootstrapValidator('validate');
            if ($("#regForm3").data('bootstrapValidator').isValid()) {
                userModel.user.firstname = $scope.fname;
                userModel.user.lastname = $scope.lname;
                userModel.user.department = $scope.department;
                userModel.user.phone = $scope.phone;
                userModel.register(function(data) {
					$scope.show=true;
					$scope.title="SUCCESS";
					$scope.content="REGISTER SUCCESS!";
					$scope.fnOk=function(){
						$scope.go($location.search().url,'slideLeft');
					}
                }, function() {
					$scope.show=true;
					$scope.title="ERROR";
					$scope.content="REGISTER ERROR!";
					$scope.fnOk=function(){
						$scope.show=false;
					}					
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
    .controller('loginCtrl', ['$scope', 'DEFAULT_AVATAR', 'userModel', '$location', function ($scope, DEFAULT_AVATAR, authService, $location) {
        $scope.imgSrc = DEFAULT_AVATAR;
		$scope.show=false;
        $scope.login = function (go) {
            authService.login($scope.email, $scope.password,function success(){
				//SUCCESS
				$scope.show=true;
				$scope.title="SUCCESS";
				$scope.content="LOGIN SUCCESS!";
				$scope.fnOk=function(){
					go($location.search().url,'slideLeft');
				}
			},function error(){
				$scope.show=true;
				$scope.title="ERROR";
				$scope.content="LOGIN ERROR!";
				$scope.fnOk=function(){
					$scope.show=false;
				}
			})
        }
    }])
    .controller('userListCtrl', ['$scope', 'userModel', function ($scope, userModel) {
		$scope.total=0;
        $scope.listType = 3;
        userModel.getUserList(function (data) {
            $scope.list = data;
            $scope.total = data.length;
        }, function () {

        })

    }])
    .controller('userInfoCtrl', ['$scope', '$routeParams', 'userModel', function ($scope, $routeParams, userModel) {
        var id = $routeParams.id, userinfo;

        if (id == +id) {
            $scope.listType = 3;
            $scope.userType = 0;   //others

            userModel.getUser(id, function (data) {
                $scope.user = data;
                $scope.$digest();
            });
        } else {
            $scope.listType = 4;
            $scope.userType = 1;   //me
            $scope.name = "Me";
            id = userModel.user.id;
            $scope.user = userModel.user;
        }

        $scope.type = 1;

        //pjModel.get_list(function (data) {
        //    $scope.list = data;
        //}, function () {
        //
        //});
        //
        //$scope.changeType = function (i) {
        //    $scope.type = i;
        //    $scope.list = i == 1 ? ideaModel.get_by_userid() : pjModel.get_by_userid();
        //}
    }]);