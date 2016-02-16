var mainCtcl = angular.module('mainController', []);


mainCtcl.controller('homepageCtrl', ['$scope', '$window', 'authenticationSvc', function ($scope, $window, authService) {
    var user = authService.getUserInfo();
    $scope.logout = function() {
        authService.logout();
        $scope.showLogin = true;
        $scope.showLogout = false;
    }
    if (user) {
        $scope.showLogout = true;
    }
    else {
        $scope.showLogin = true;
    }
}]);