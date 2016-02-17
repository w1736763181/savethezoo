var service = angular.module('mainService', ['ngResource']);

var HOST1='http://10.59.189.8:8080/ajax/';

var transformRequest=function(data, headersGetter) {
	var headers = headersGetter();
	headers['Content-Type'] = undefined;
	
	if (data == undefined) {
	  return data;
	}

	var fd = new FormData();

	var createKey = function(_keys_, currentKey) {
	  var keys = angular.copy(_keys_);
	  keys.push(currentKey);
	  formKey = keys.shift()

	  if (keys.length) {
		formKey += "[" + keys.join("][") + "]"
	  }

	  return formKey;
	}

	var addToFd = function(object, keys) {
	  angular.forEach(object, function(value, key) {
		var formKey = createKey(keys, key);

		if (value instanceof File) {
		  fd.append(formKey, value);
		} else if (value instanceof FileList) {
		  if (value.length == 1) {
			fd.append(formKey, value[0]);
		  } else {
			angular.forEach(value, function(file, index) {
			  fd.append(formKey + '[' + index + ']', file);
			});
		  }
		} else if (value && (typeof value == 'object' || typeof value == 'array')) {
		  angular.forEach(value,function(a){
			  fd.append(formKey, a);
		  })
		} else {
		  fd.append(formKey, value);
		}
	  });
	}

	addToFd(data, []);

	return fd;
}

service.constant('DEFAULT_AVATAR', 'img/head/default.png');

service.factory('userModel', ['$rootScope', '$resource', 'DEFAULT_AVATAR', function($rootScope,$resource,DEFAULT_AVATAR){
	var userUrl=HOST1+'user/:id';
	var User=$resource(userUrl,null,{
		login:{method:'POST',params:{type:'login'},isArray:true,transformRequest:transformRequest},
		logout:{method:'POST',params:{type:'logout'}},
		save:{method:'POST',transformRequest:transformRequest,isArray:true},
		get_user:{method:'GET',isArray:true},
		get_list:{method:'GET',isArray:true}
	});
	
	var user={
		isLogin:false,
		user:{
			id:0,
			email: "",
			head: "",
			firstname: "",
			lastname: "",
			department: "",
			phone: "",
			password: ""
		},
		clear:function(){
			this.user={};
		},
		login:function(username,pwd,suc,err){
			var that=this;
			User.login({
				email:username,
				password:pwd
			}).$promise.then(function(data){
				that.isLogin=true;
				var m=data[0];
				that.user=m;
				that.user.head=that.user.head||DEFAULT_AVATAR;
				suc();
			},function(){
				err();
			})
		},
		logout:function(id){
			/* TODO   HTTP
			User.logout({
				id:id
			})*/
			this.isLogin=false;
			this.clear();
		},
		register:function(suc,err){
			var that=this;
			user=this.user;
			User.save(user).$promise.then(function(data){
				var m=data[0];
				that.isLogin=true;
				that.user=m;
				suc();
			},function(){
				err();
			})
		},
		getUser:function(id,suc,err){
			User.get_user({id:id}).$promise.then(function(data){
				var user=data[0];
				user.head=user.head || DEFAULT_AVATAR;
				suc(user);
			},function(err){
				//HANDLE ERROR.
			});
		},
		getUserList:function(suc,err){
			User.get_list().$promise.then(function(data){
				//DATA ADAPTER
				for(var i=0,t;i<data.length;i++){
					t=data[i];
					t['head']=t['head'] || DEFAULT_AVATAR;
				}				
				suc(data);
			},function(err){
				//err();
			})
		}
	};

	return user;
}]);

service.factory('categoryModel', ['$resource', function($resource){
	var cateUrl=HOST1+'category';
	var Cate=$resource(cateUrl,null,{
		get_list:{method:'GET',isArray:true}
	});
	
	var cate;
	return {
		getCategoryList:function(suc){
			if(cate){
				suc(cate);
			}else{
				Cate.get_list().$promise.then(function(d){
					cate=d;
					suc(d);
				})
			}
		}
	}
}])

service.factory('cropImage', function() {
	var imgToCrop;
	var cropedImg;
	return {
		imgToCrop: imgToCrop,
		cropedImg: cropedImg,
	}
});

service.factory('ideaModel',['$resource', function($resource){
	var ideaUrl=HOST1+'idea/:id';
	var Idea=$resource(ideaUrl,null,{
		'save': {method:'POST',transformRequest:transformRequest},
		'get_idea':{method:'GET',isArray:true},
		'get_list':{method:'GET',isArray:true}
	});
	var idea={
		title:'',
		description:'',
		type:'',
		impact:'',
		image:[],
		files:[],
	},
	clear=function(){
		idea={};
		idea.image=[];
		idea.files=[];
	},
	get_idea=function(id,suc,err){
		Idea.get_idea({
			id:id
		}).$promise.then(function(data){
			suc(data[0]);
		},function(){
			err()
		});
	},	
	post_idea=function(uid,suc,err){
		var m=idea;
		var t={
			uid:uid,
			title:m.title,
			description:m.description,
			businessImpact:m.impact,
			cid:m.type,
			image:m.files,
			status:1			
		};
		Idea.save(t).$promise.then(suc,err);
	},
	vote=function(userid,ideaid){
		//VOTE
	},
	get_list=function(suc,error){
		Idea.get_list().$promise.then(function(data){
			for(var i=0,len=data.length,t;i<len;i++){
				t=data[i];
				t['src']=t['image'][0]
			}
			suc(data);
		},function(err){
			error(err)
		})
	},
	get_by_userid=function(id){
		
	},
	get_by_date=function(from,to){
		
	};
	
	return{
		getIdea:function(){
			return idea;
		},
		clear:clear,
		get:get_idea,
		submit:post_idea,
		get_list:get_list,
		get_by_userid:get_by_userid,
		get_by_date:get_by_date
	}
}])
.factory('messageModel', ['$resource', function($resource){
	var msgUrl=HOST1+'message/';
	var Msg=$resource(msgUrl,null,{
		get_list:{method:'GET',isArray:true}
	});
	
	var get_list=function(id,suc,err){
		Msg.get_list().$promise.then(function(data){
			suc(data);
		},function(){
			
		})
	}
	
	return {
		get:get_list
	};
}])
.factory('projectModel', ['$resource', function ($resource) {
	var projectUrl=HOST1+'project/:id';
	var Project=$resource(projectUrl,null,{
		'save': {method:'POST',transformRequest:transformRequest},
		'get_pj':{method:'GET',isArray:true},
		'get_list':{method:'GET',isArray:true}
	});
	
	var project={
		selectedUser:[],
		imgsSrc:[],
		files:[]				
	},
	clear=function(){
		project={
			selectedUser:[],
			imgsSrc:[],
			files:[]				
		}
	},
	get_project=function(id,suc,err){
		Project.get_pj({
			id:id
		}).$promise.then(function(da){
			suc(da[0])
		},function(){
			
		})
	},
	get_list=function(suc,err){
		Project.get_list().$promise.then(function(da){
			suc(da);
		},function(){
			
		})
	},
	get_by_userid=function(id){
		
	},
	get_by_date=function(from,to){
		
	},
	create=function(suc,err){
		Project.save().$promise.then(function(){
			suc()
		},function(){
			err()
		})
	};
	
	return{
		project:project,
		get:get_project,
		get_list:get_list,
		get_by_userid:get_by_userid,
		get_by_date:get_by_date,
		post:create,
		clear:clear
	}
}])
.factory('coinModel', ['$resource', function ($resource) {
	var msgUrl=HOST2+'coin/';
	var Msg=$resource(msgUrl,null,{
		get_list:{method:'GET',isArray:true}
	});
	
	var get=function(id,suc,err){
		Msg.get_list({id:id}).$promise.then(function(data){
			suc(data);
		},function(){
			
		})
	};
	
	return{
		get:get
	}
}])