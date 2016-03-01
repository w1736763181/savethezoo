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

	}

	function submit(success, fail) {
		$.ajax({
			url: "ajax/idea/create",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(idea),
			success: function(data) {
				success(data);
			},
			error: function() {
				fail();
			}
		});
	}

	function getCategoryList(success, fail){
		if(categoryList) {
			return categoryList;
		}
		$.ajax({
			url: "ajax/category/",
			method: "GET",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				categoryList = data;
				success(data);
			},
			statusCode: {
			}
		});
		return categoryList;
	}

	return {
		getCategoryList : getCategoryList,
		getIdea : getIdea,
		submit: submit
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

service.factory('ideaModel',['$rootScope',function($rootScope){

	function getIdea(id, success, fail) {
		$.ajax({
			url: "ajax/idea/" + id ,
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify($rootScope.user),
			success: function(data) {
				success(data);
			}
		});
	}

	function getIdeasByUser(user, success, fail) {
		$.ajax({
			url: "ajax/idea/me",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(user),
			success: function(data) {
				success(data);
			}
		});
	}
	var idea_list = function(success, error) {
		$.ajax({
			url: "ajax/idea",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify($rootScope.user),
			success: function (data) {
				success(data);
			}
		});
	};
	var like = function(ideaid, success, error) {
		var voting = {
			uid: $rootScope.user.id,
			ideaid : ideaid
		}
		$.ajax({
			url: "ajax/idea/voting",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(voting),
			success: function(data) {
				success(data);
			}
		});
	};

	var addComment = function(comment, ideaid, success, fail) {
		var temp = {
			uid: $rootScope.user.id,
			ideaid : ideaid,
			text: comment
		}
		$.ajax({
			url: "ajax/idea/comment",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(temp),
			success: function(data) {
				success(data);
			}
		});
	}

	var getComments = function(ideaid, success, fail) {
		$.ajax({
			url: "ajax/idea/" + ideaid + "/comment",
			method: "GET",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				success(data);
			}
		});
	}

	var approve = function(ideaModel, success, error) {

		$.ajax({
			url: "ajax/idea/approve",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(ideaModel),
			success: function(data) {
				success(data);
			}
		});
	};
	return {
		like : like,
		getIdeaList : idea_list,
		getIdea : getIdea,
		approve : approve,
		getIdeasByUser : getIdeasByUser,
		comment: addComment,
		getComments: getComments
	}
}]);

service.factory('projectModel',['$rootScope',function($rootScope){
	var project = {};
	project.member = [];
	var users = [];
	var ideaModel = {};

	var clear = function() {
		project = {};
		project.member = [];
		users = [];
		ideaModel = {};
	}

	var addPeople = function(ids, selectedUsers){
		for(var i = 0; i < ids.length; i++) {
			var index = project.member.indexOf(ids[i]);
			if(index < 0) {
				project.member.push(ids[i]);
				users.push(selectedUsers[i]);
			}
		}
	}

	var addMember = function(pid, success, fail) {
		$.ajax({
			url: "ajax/project/" + pid + "/addMember/",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(project),
			success: function(data) {
				success(data);
			},
			error: function(jqXhR, textStatus) {
				fail();
			}
		});
	}

	var generateProject = function(success, fail) {
		project.uid = ideaModel.uid;
		$.ajax({
			url: "ajax/idea/generate/" + ideaModel.id,
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(project),
			success: function(data) {
				success(data);
			},
			error: function(jqXhR, textStatus) {
				fail();
			}
		});
	}

	var getProject = function() {
		return project;
	}

	var getUsers = function() {
		return users;
	}

	var setIdeaModel = function(idea) {
		ideaModel = idea;
	}

	function getProjectFromRemote(id, success, fail) {
		$.ajax({
			url: "ajax/project/" + id ,
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify($rootScope.user),
			success: function(data) {
				success(data);
			}
		});
	}
	var project_list = function(success, error) {
		$.ajax({
			url: "ajax/project",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify($rootScope.user),
			success: function (data) {
				success(data);
			}
		});
	};

	function getProjectByUser(user, success, fail) {
		$.ajax({
			url: "ajax/project/me",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(user),
			success: function(data) {
				success(data);
			}
		});
	}

	var like = function(pid, success, error) {
		var voting = {
			uid: $rootScope.user.id,
			pid : pid
		}
		$.ajax({
			url: "ajax/project/voting",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(voting),
			success: function(data) {
				success(data);
			}
		});
	};

	var addComment = function(comment, pid, success, fail) {
		var temp = {
			uid: $rootScope.user.id,
			pid : pid,
			text: comment
		}
		$.ajax({
			url: "ajax/project/comment",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(temp),
			success: function(data) {
				success(data);
			}
		});
	}

	var getMembers = function(pid, success, fail) {
		$.ajax({
			url: "ajax/project/" + pid + "/member",
			method: "GET",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				success(data);
			}
		});
	}

	var getComments = function(pid, success, fail) {
		$.ajax({
			url: "ajax/project/" + pid + "/comment",
			method: "GET",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				success(data);
			}
		});
	}

	var updateStatus = function(projectModel) {
		$.ajax({
			url: "ajax/project/updateSatus",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(projectModel),
			success: function(data) {

			}
		});
	}

	return {
		getProject : getProject,
		addPeople : addPeople,
		getUsers : getUsers,
		setIdea : setIdeaModel,
		generateProject : generateProject,
		clear : clear,
		like : like,
		getProjectList : project_list,
		getPJ : getProjectFromRemote,
		getProjectByUser : getProjectByUser,
		comment: addComment,
		getComments: getComments,
		getMember : getMembers,
		updateStatus : updateStatus,
		addMember : addMember
	}
}]);

service.factory("statSvc", function() {
	var getStat = function(success, fail) {
		$.ajax({
			url: "ajax/stat",
			method: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				success(data);
			},
			error: function(jqXhR, textStatus) {
				fail();
			}
		});
	}

	return {
		getStat : getStat
	};
});

service.factory("authenticationSvc", function($http, $q, $location, $rootScope, $cookies) {
	var userInfo;
	function login(email, password, success, fail) {
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
        $cookies['user']=email+',,,'+password;
				success && (success(data));
			},
			error: function(jqXhR, textStatus) {
				fail && (fail());
			}
		});
	}
	function logout() {
		userInfo = null;
    delete $cookies['user'];
		localStorage.removeItem("userInfo");
	}

	function getUserInfo() {
		//if(userInfo == null) {
		//	//userInfo = JSON.parse(localStorage.getItem("userInfo"));
		//	//login(
		//	//	userInfo.email,
		//	//	userInfo.password,
		//	//	function(data){},
		//	//	function() {
		//	//		$rootScope.go("/user/login", 'slideLeft');
		//	//		$rootScope.$apply();
		//	//	}
		//	//)
		//}
		return userInfo;
	}
	return {
		login: login,
		logout: logout,
		getUserInfo: getUserInfo
	}
});


