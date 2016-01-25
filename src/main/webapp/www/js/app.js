var app = angular.module('myApp', [
    'ngAnimate',
	'ngTouch',
    'ngImgCrop',
	'mainService',
	'mainDirective',
	'mainController',
    'ideaController',
    'projectController',
    'userController',
	'mainRouter',
    'angular-carousel'
]);
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|blob):/);
}]);
app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window, $state) {
    $rootScope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') {
            $rootScope.pageAnimationClass = 'slideRight';
        }
        
        else {
			$rootScope.pageAnimationClass = pageAnimationClass
        }

        if (!path) {
            $window.history.back();
        }
        
        else{
            $location.path(path);
        }
    };
	$rootScope.checkAndDo = function(valid, fn){
		if(valid){
			var args = [].slice.call(arguments,2);
			fn.apply(null,args);
		}
	}
	$rootScope.$on('$routeChangeSuccess', function(e,to,toP,from,fromP){
		//console.log(1)
        //$rootScope.pageAnimationClass = 'slideRight';
	});

    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/user/login");
        }
    });
}]);