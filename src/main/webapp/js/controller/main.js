var mainCtcl = angular.module('mainController', []);


mainCtcl.controller('homepageCtrl', ['$scope', '$window', 'authenticationSvc', 'statSvc', function ($scope, $window, authService, statSvc) {

    var user = authService.getUserInfo();

    //if(!user) {
    //    var user = JSON.parse(localStorage.getItem("userInfo"));
    //}

    statSvc.getStat(function(data) {
        $scope.stat = data;
        $scope.$digest();
    }, function() {

    });

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