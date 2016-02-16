var service = angular.module('mainService', ['ngResource']);
var HOST='http://10.59.186.16:8888/ajax/';
var HOST2='http://127.0.0.1:3000/';

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

service.constant('DEFAULT_AVATAR', 'img/head.png');
service.constant('ANIMAL_IMAGES', [['img/animals/1giraffe_idea.png','img/animals/2giraffe_designfinish.png','img/animals/3giraffe_readyfordone.png','img/animals/winner_giraffe.png'],
	['img/animals/4lion_idea.png','img/animals/5lion_designfinish.png','img/animals/6lion_readyfordone.png','img/animals/winner_lion.png'],
	['img/animals/7monkey_idea.png','img/animals/8monkey_designfinish.png','img/animals/9monkey_readyfordone.png','img/animals/winner_monkey.png'],
	['img/animals/10eagle_idea.png','img/animals/11eagle_designfinish.png','img/animals/12eagle_readyfordone.png','img/animals/winner_eagle.png']]);

service.factory('ideaModel',['$resource', function($resource){
		var ideaUrl=HOST2+'idea/:id';
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
			imgsSrc:[],
			files:[],
		},
		clear=function(){
			idea={};
			idea.imgsSrc=[];
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
		get_list=function(uid,suc,error){
			Idea.get_list({
				uid:uid
			}).$promise.then(function(data){
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
			idea:idea,
			clear:clear,
			get:get_idea,
			post:post_idea,
			get_list:get_list,
			get_by_userid:get_by_userid,
			get_by_date:get_by_date
		}
	}])
	.factory('userModel', ['$rootScope', '$resource',function($rootScope,$resource){
		var userUrl=HOST2+'user/:id';
		var User=$resource(userUrl,null,{
			login:{method:'POST',params:{type:'login'},isArray:true,transformRequest:transformRequest},
			logout:{method:'POST',params:{type:'logout'}},
			save:{method:'POST',transformRequest:transformRequest,isArray:true},
			get_user:{method:'GET',isArray:true},
			get_list:{method:'GET',isArray:true}
		});
		var user={
			isLogin:false,
			model:{},
			clear:function(){
				this.model={};
			},
			login:function(username,pwd,suc,err){
				var that=this;
				User.login({
					email:username,
					password:pwd
				}).$promise.then(function(data){
					that.isLogin=true;
					var m=data[0];
					that.model={
						id:m.id,
						avatar:m.head,
						username:m.lastname,
						name:m.firstname,
						department:m.department,
						email:m.email,
						mobile:m.phone,
						coin:m.coin,
						messageNum:12			
					}
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
				user=this.model;
				User.save({
					email:user.email,
					username:user.username,
					firstname:user.name,
					lastname:user.name,
					department:user.department,
					password:user.password,
					phone:user.mobile,
					image:user.image
					//AVATAR
				}).$promise.then(function(data){
					var m=data[0];
					that.isLogin=true;
					that.model={
						id:m.id,
						avatar:m.head,
						username:m.lastname,
						name:m.firstname,
						department:m.department,
						email:m.email,
						mobile:m.phone,
						coin:m.coin,
						messageNum:12			
					}
					suc();
				},function(){
					err();
				})
			},
			get_user:function(id,suc,err){
				User.get_user({id:id}).$promise.then(function(data){
					var user=data[0]
					suc(user);
				},function(err){
					//HANDLE ERROR.
				});
			},
			get_list:function(suc,err){
				User.get_list().$promise.then(function(data){
					suc(data);
				},function(err){
					//err();
				})
			}
		};

		return user;
	}])
	.factory('messageModel', ['$resource', function($resource){
		var msgUrl=HOST2+'message/';
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
		var projectUrl=HOST2+'project/:id';
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