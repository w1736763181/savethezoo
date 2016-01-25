var userCtrl = angular.module('userController', []);

userCtrl
    .controller('register1Ctrl', ['$scope', "register", function ($scope, register) {
        $scope.checkAndDo = function (fn, a, b) {
            $("#regForm1").bootstrapValidator('validate');
            if ($("#regForm1").data('bootstrapValidator').isValid()) {
                register.user.email = $scope.email;
                register.user.password = $scope.password;
                register.user.password = $scope.confirmPassword;
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
    .controller('register2Ctrl', ['$scope', 'DEFAULT_AVATAR', 'register', function ($scope, DEFAULT_AVATAR, register) {
        $scope.imgSrc = DEFAULT_AVATAR;
        register.imgToCrop;
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    register.imgToCrop = evt.target.result;
                    $scope.go('/user/crop', 'slideLeft');
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#input_head')).on('change', handleFileSelect);
        //
    }])
    .controller('register3Ctrl', ['$scope', 'upload', 'DEFAULT_AVATAR', function ($scope, upload, DEFAULT_AVATAR) {
        $scope.show = false;
        $scope.save = function () {
            $scope.show = true;
        }

        $scope.fnOk = function () {
            //console.log(1)
        }
        $scope.fnCancel = function () {
            $scope.show = false;
        }
    }])
    .controller('register4Ctrl', ['$scope', 'register', function ($scope, register) {
        $scope.myImage = register.imgToCrop;
        $scope.myCroppedImage = '';

        $scope.confirm = function () {
            register.user.head = $scope.myCroppedImage;
            if (register.imgToCrop && register.user.head) {
                $scope.go('user/register_step3', 'slideLeft');
            }
        }
    }])
    .controller('loginCtrl', ['$scope', 'DEFAULT_AVATAR', function ($scope, DEFAULT_AVATAR) {
        $scope.imgSrc = DEFAULT_AVATAR;
    }]);