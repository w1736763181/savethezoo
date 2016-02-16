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

service.factory('registerModel', ['$http', function($http) {
	var user = {
		email: "",
		head: "",
		firstname: "",
		lastname: "",
		department: "",
		phone: "",
		password: ""
	};
	function register(success, err) {
		$.ajax(
			{
				url: "ajax/user/register",
				method: "post",
				data:JSON.stringify(user),
				dataType:"json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					success(data);
				},
				statusCode: {
				}
			}
		);
	}
	return {

		user : user,
		register : register
	};
}]);

service.factory('createIdea', function($q, $location, $rootScope) {
	var categoryList;
	var idea = {};
	function getIdea() {
		return idea;
	}

	function fetchCategoryList() {
		$.ajax({
			url: "ajax/category/",
			method: "GET",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				categoryList = data;
				$rootScope.$broadcast('cagtegoryList:fetched', data);
			},
			statusCode: {
			}
		});
	}

	function submit() {
		$.ajax({
			url: "ajax/idea/craete",
			method: "POST",
			data : idea,
			success: function(data) {
				$rootScope.$broadcast("idea:createSuccess", data);
			}
		});
	}

	function getCategoryList(){
		if(categoryList) {
			return categoryList;
		}
		fetchCategoryList();
		return categoryList;
	}

	return {
		getCategoryList : getCategoryList,
		getIdea : getIdea,
		subimt: submit
	}
});

service.factory('cropImage', function() {
	var imgToCrop;
	var cropedImg;
	return {
		imgToCrop: imgToCrop,
		cropedImg: cropedImg,
	}
});

service.factory("peopleModel", function() {
	function getUserList(success, error) {
		$.ajax({
			url: "ajax/user",
			method: "GET",
			success: function(data) {
				success(data);
			}
		});
	}

	function getUser(userid, success, error) {
		$.ajax({
			url: "ajax/user/" + userid,
			method: "GET",
			success: function(data) {
				success(data[0]);
			}
		});
	}
	return {
		getUserList : getUserList,
		getUser : getUser
	}
});

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
service.factory("authenticationSvc", function($http, $q, $location, $rootScope) {
	var userInfo;
	function login(email, password) {
		var user = {
			email : email,
			password : password
		}
		$.ajax({
			url: "ajax/user/login",
			method: "POST",
			data: JSON.stringify(user),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				userInfo = data;
				$rootScope.user = data;
				$location.path("homepage")
				$rootScope.$digest();
			},
			statusCode: {
				401: function () {
					alert("error");
				}
			}
		});
	}
	function logout() {
		userInfo = null;
	}

	function getUserInfo() {
		return userInfo;
	}
	return {
		login: login,
		logout: logout,
		getUserInfo: getUserInfo
	}
});


