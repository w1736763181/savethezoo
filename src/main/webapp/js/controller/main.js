var mainCtcl = angular.module('mainController', []);


mainCtcl.controller('homepageCtrl', ['$scope', '$window', 'userModel', function ($scope, $window, authService) {
    $scope.logout = function() {
        authService.logout();
        $scope.showLogin = true;
        $scope.showLogout = false;
    }
    if (authService.isLogin) {
        $scope.showLogout = true;
    }
    else {
        $scope.showLogin = true;
    }
}]);