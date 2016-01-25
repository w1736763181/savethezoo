var service = angular.module('mainService', []);

service.constant('DEFAULT_AVATAR', 'img/head.png');

service.factory('upload', ['$http', function($http) {
	var upload=function(fd,cb){
		$http.post('/pic',fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		})
		.success(function(data){
			cb(data)
		})
		.error(function(err){
			console.log(err)
		})			
	}

	return {
		upload:upload
	}
}]);

service.factory('register', ['$http', function($http) {
	var imgToCrop;
	var cropedImg;
	var email;
	var password;
	var fname;
	var lname;
	var department;
	var phone;
	return {
		imgToCrop: imgToCrop,
		user : {
			email: email,
			head: cropedImg,
			firstname: fname,
			lastname: lname,
			department: department,
			phone: phone,
			password: password
		}
	};
}]);

service.factory('ideaModel',[function(){
	var idea={
		title:'',
		description:'',
		type:'',
		impact:'',
		imgsSrc:[],
		files:[],
	}
	var clear=function(){
		idea.title="";
		idea.description="";
		idea.type="";
		idea.impact="";
		idea.imgsSrc.length=0;
		idea.files.length=0;
	}
	return{
		idea:idea,
		clear:clear
	}
}]).factory('ideaListModel',[function(){
		//TEST
		var temp_item={
			title:'innovation gomification app',
			id:66,
			author:'lili',
			authorLink:'/user/12',
			like: 8,
			description:'To create an environment and platform where employees can be creative and find',
			src:'http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg',
			type:'img/category/4lion_idea.png',
			date:'2016-01-19 16:22',
			pjState:'2'
		}

		var get_list=function(){
			return [
				temp_item,
				angular.copy(temp_item),
				angular.copy(temp_item),
				angular.copy(temp_item),
				angular.copy(temp_item)
			];
		}

		return {
			get:get_list
		}
	}])
	.factory('projectListModel', ['$rootScope',function($rootScope){
		//TEST
		var temp_item={
			title:'innovation gomification app',
			id:66,
			author:'lili',
			authorLink:'/user/12',
			like: 8111,
			description:'fdsafdsfds fda fdsa fdsaf  da f dsa f dsf a dsf ds f dsa f dsa f dsaf ads fds ',
			src:'http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg',
			type:'img/category/5lion_designfinish.png',
			date:'2016-01-19 16:22',
			pjState:'4'
		}

		var get_list=function(){
			return [
				temp_item,
				angular.copy(temp_item),
				angular.copy(temp_item),
				angular.copy(temp_item),
				angular.copy(temp_item)
			];
		}

		return {
			get:get_list
		}
	}])
	.factory('ideaModel',[function(){
		var idea={
			title:'',
			description:'',
			type:'',
			impact:'',
			imgsSrc:[],
			files:[],
		}
		var clear=function(){
			idea.title="";
			idea.description="";
			idea.type="";
			idea.impact="";
			idea.imgsSrc.length=0;
			idea.files.length=0;
		}

		var get_idea=function(){
			var test_idea={
				title:'haha this is title',
				author:'Siqi Zhuo',
				description:'this is description This is another complete Spring MVC tutorial which ' +
				'accepts file on Upload form and copy it to specific folder on “Submit” event. ' +
				'As usual we have a dependency on Hello World Spring MVC Example.',
				type:'3',
				impact:'huge impact This is another complete Spring MVC tutorial which ' +
				'accepts file on Upload form and copy it to specific folder on “Submit” ' +
				'event. As usual we have a dependency on Hello World Spring MVC Example.',
				imgsSrc:[],
				files:['http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg',
					'http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg'],
				pjState:'2'
			}
			return test_idea;
		}
		return{
			idea:idea,
			clear:clear,
			get:get_idea
		}
	}]);
service.factory("authenticationSvc", function($http, $q, $window) {
	var userInfo = {
		username : 'wuzhao',
		password : 'w19940119'
	};
	function login(userName, password) {

	}

	function getUserInfo() {
		return userInfo;
	}
	return {
		login: login,
		getUserInfo: getUserInfo
	}
});


