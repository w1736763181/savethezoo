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
        .when('/user/register_step4', {
            controller : 'register4Ctrl',
            templateUrl : 'template/user/register_step4.html'
        })
		.when('/user/login', {
            controller : 'loginCtrl',
            templateUrl : 'template/user/login.html'			
		})
		.when('/user/list', {
            controller : 'userListCtrl',
            templateUrl : 'template/user/list.html'			
		})	
		.when('/user/add_list', {
            controller : 'userAddProjectCtrl',
            templateUrl : 'template/user/add_list.html'			
		})			
		.when('/idea/create', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create.html'			
		})
		.when('/idea/create_step1', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create_step1.html'			
		})
		.when('/idea/create_step2', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create_step2.html'			
		})
		.when('/idea/create_step3', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create_step3.html'			
		})
		.when('/idea/create_step4', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/create_step4.html'			
		})
		.when('/idea/idea_preview', {
            controller : 'ideaCreateCtrl',
            templateUrl : 'template/idea/idea_preview.html'
        })
		.when('/idea/list', {
            controller : 'ideaListCtrl',
            templateUrl : 'template/idea/list.html'			
		})
		.when('/idea/:id', {
            controller : 'ideaDetailCtrl',
            templateUrl : 'template/idea/idea_detail.html'
        })			
		.when('/project/list', {
            controller : 'projectListCtrl',
            templateUrl : 'template/project/list.html'			
		})	
		.when('/project/create_step1', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step1.html'			
		})
		.when('/project/create_step2', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step2.html'			
		})
		.when('/project/create_step3', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step3.html'			
		})
		.when('/project/create_step4', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step4.html'			
		})
		.when('/project/create_step5', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step5.html'			
		})
		.when('/project/create_step6', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_step6.html'			
		})
		.when('/project/create_finish', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/create_finish.html'			
		})
        .when('/project/project_preview', {
            controller : 'projectCreateCtrl',
            templateUrl : 'template/project/project_preview.html'
        })		
		.when('/404', {
            templateUrl : 'template/404.html'			
		})
        .when('/project/:id', {
            controller : 'projectDetailCtrl',
            templateUrl : 'template/project/project_detail.html'
        })
        .otherwise({
            redirectTo : '404'
        });
}]);