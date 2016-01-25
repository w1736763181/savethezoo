var app = angular.module('myApp', [
    'ngAnimate',
	'ngTouch',
	'mainService',
	'mainDirective',
	'mainController',
	'mainRouter',
    'angular-carousel'
]);

app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|blob):/);
}])
.run(['$rootScope', '$location', '$window', 'userMeModel', 'ANIMAL_IMAGES', function ($rootScope, $location, $window, userMeModel, ANIMAL_IMAGES) {
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
        
        else {
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
	})
    $rootScope.iconSrc = ANIMAL_IMAGES;
}])