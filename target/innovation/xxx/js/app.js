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
.run(['$rootScope', '$location', '$window', 'userModel', 'ANIMAL_IMAGES', function ($rootScope, $location, $window, userModel, ANIMAL_IMAGES) {
	//these relating urls need login
	var REG_CTRL_NEED_LOGIN = /histroy|add_list|message|user\/me|create|preview/i;
	
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
	$rootScope.$on('$locationChangeStart', function(){
		if(REG_CTRL_NEED_LOGIN.test($location.path()) && !userModel.isLogin){
			var params=$location.path();
			$location.path('user/login').search({url:params});
		}
	})
    $rootScope.iconSrc = ANIMAL_IMAGES;
}])