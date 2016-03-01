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
    'angular-carousel',
    'ngCookies',
]);
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|blob):/);
}]);
app.run(['$rootScope', '$location', '$window', 'authenticationSvc', '$cookies', '$timeout', function ($rootScope, $location, $window, auth, $cookies, $timeout) {
    FastClick.attach(document.body);
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
	}/*
	$rootScope.$on('$routeChangeSuccess', function(e,to,toP,from,fromP){
		//console.log(1)
        //$rootScope.pageAnimationClass = 'slideRight';
	});
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
        if (eventObj.authenticated === false && auth.getUserInfo()) {
            $location.path("/user/login");
        }
    });
 */   
	$rootScope.$on('$locationChangeStart', function(e){
    var REG_CTRL_NEED_LOGIN = /histroy|add_list|message|create|preview|idea|project|list/i;
		if(REG_CTRL_NEED_LOGIN.test($location.path()) && !auth.getUserInfo()){
        var params=$location.path();
      	if(!$cookies['user']){
          $location.path('user/login').search({url:params});  
        }else{
          auth.login.apply(auth,$cookies['user'].split(',,,').concat([function(){
            $location.path($location.path())
          },function(){
            $location.path('user/login').search({url:params});
          }]))
        }
		}else 	if(!auth.getUserInfo() && $cookies['user']){
		  auth.login.apply(auth,$cookies['user'].split(',,,'))
    }
	})
}]);

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
});