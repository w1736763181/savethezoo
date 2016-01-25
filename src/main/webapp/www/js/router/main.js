var router = angular.module('mainRouter', [
    'ngRoute'
]);

router.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/homepage', {
            controller : 'homepageCtrl',
            templateUrl : 'template/homepage.html'
        })
        .when('/user/register_step1', {
            controller : 'register1Ctrl',
            templateUrl : 'template/user/register_step1.html'
        })
        .when('/user/register_step2', {
            controller : 'register2Ctrl',
            templateUrl : 'template/user/register_step2.html'
        })
        .when('/user/register_step3', {
            controller : 'register3Ctrl',
            templateUrl : 'template/user/register_step3.html'
        })
        .when('/user/crop', {
            controller : 'register4Ctrl',
            templateUrl : 'template/user/crop.html'
        })
		.when('/user/login', {
            controller : 'loginCtrl',
            templateUrl : 'template/user/login.html'			
		})
		.when('/idea/create', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc){
                    var usreInfo = authenticationSvc.getUserInfo();
                    if(usreInfo) {
                        return $q.when(usreInfo);
                    }
                    else {
                        return $q.reject({authenticated: false});
                    }
                }]
            }
		})
		.when('/idea/create_step1', {
            controller : 'ideaCreate1Ctrl',
            templateUrl : 'template/idea/create_step1.html'			
		})
		.when('/idea/create_step2', {
            controller : 'ideaCreate2Ctrl',
            templateUrl : 'template/idea/create_step2.html'			
		})
		.when('/idea/create_step3', {
            controller : 'ideaCreate3Ctrl',
            templateUrl : 'template/idea/create_step3.html'			
		})
		.when('/idea/create_step4', {
            controller : 'ideaCreate4Ctrl',
            templateUrl : 'template/idea/create_step4.html'			
		})
        .when('/idea/list', {
            controller : 'ideaListCtrl',
            templateUrl : 'template/idea/list.html'
        })
        .when('/project/list', {
            controller : 'projectListCtrl',
            templateUrl : 'template/project/list.html'
        })
        .when('/project/create_step1', {
            controller : 'projectCreate1Ctrl',
            templateUrl : 'template/project/create_step1.html'
        })
        .when('/project/create_step2', {
            controller : 'projectCreate2Ctrl',
            templateUrl : 'template/project/create_step2.html'
        })
        .when('/project/create_step3', {
            controller : 'projectCreate3Ctrl',
            templateUrl : 'template/project/create_step3.html'
        })
        .when('/project/create_step4', {
            controller : 'projectCreate4Ctrl',
            templateUrl : 'template/project/create_step4.html'
        })
        .when('/project/create_step5', {
            controller : 'projectCreate4Ctrl',
            templateUrl : 'template/project/create_step5.html'
        })
        .when('/project/create_step6', {
            controller : 'projectCreate4Ctrl',
            templateUrl : 'template/project/create_step6.html'
        })
        .when('/idea/preview', {
            controller : 'ideaPreviewCtrl',
            templateUrl : 'template/idea/preview.html'
        })
        .when('/idea/:id', {
            controller : 'ideaDetailCtrl',
            templateUrl : 'template/idea/detail.html'
        })
        .otherwise({
            redirectTo : 'homepage'
        });
}]);