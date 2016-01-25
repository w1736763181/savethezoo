var service = angular.module('mainService', []);

service.constant('DEFAULT_AVATAR', 'img/head.png');
service.constant('ANIMAL_IMAGES', [['img/animals/1giraffe_idea.png','img/animals/2giraffe_designfinish.png','img/animals/3giraffe_readyfordone.png'],
	['img/animals/4lion_idea.png','img/animals/5lion_designfinish.png','img/animals/6lion_readyfordone.png'],
	['img/animals/7monkey_idea.png','img/animals/8monkey_designfinish.png','img/animals/9monkey_readyfordone.png'],
	['img/animals/10eagle_idea.png','img/animals/11eagle_designfinish.png','img/animals/12eagle_readyfordone.png']]);

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
				'http://www.pp3.cn/uploads/allimg/111118/10562Cb5-13.jpg'],
			pjState:'1'
		}
		return test_idea;
	}
	return{
		idea:idea,
		clear:clear,
		get:get_idea
	}
}])
.factory('ideaListModel',[function(){
	//TEST
	var temp_item={
			title:'innovation gomification app',
			id:66,
			author:'lili',
			authorLink:'/user/12',
			like: 8,
			description:'fdsafdsfds fda fdsa fdsaf  da f dsa f dsf a dsf ds f dsa f dsa f dsaf ads fds ',
			src:'https://www.baidu.com/img/bd_logo1.png',	
			type:'img/animals/4lion_idea.png',
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
.factory('userMeModel', ['$rootScope',function($rootScope){
	var user={
		isLogin:false,
		model:{},
		login:function(username,pwd){
			//HTTP POST
			//SET COOKIE
			//-----SUCCESS
			this.isLogin=true;		
			this.model={};
		},
		logout:function(){
			this.isLogin=false;
			//HTTP POST 
			//CLEAR COOKIE
		},
		register:function(user){
			this.isLogin=false;
			//HTTP POST
			//----SUCCESS
			this.isLogin=true;
			this.model=user;
		},
		needLogin:function(){
			if(!this.isLogin){
				$rootScope.go('/user/login', 'slideLeft');
			}
		}
	};
	
	return user;
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
			src:'https://www.baidu.com/img/bd_logo1.png',	
			type:'img/animals/4lion_idea.png',
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
.factory('projectCreateModel',[function(){
	var project={
		projectMember:[{image:'img/animals/3giraffe_readyfordone.png',name:'Terrence Dong'},
			{image:'img/animals/6lion_readyfordone.png',name:'Jason Wu'},
			{image:'img/animals/9monkey_readyfordone.png',name:'Liang Tang'},
			{image:'img/animals/3giraffe_readyfordone.png',name:'Siqi Zhuo'},
			{image:'img/animals/6lion_readyfordone.png',name:'Jason Wu'},
			{image:'img/animals/9monkey_readyfordone.png',name:'Liang Tang'}],
		selectedUser:[],
		imgsSrc:[],
		files:[]
	}
	var clear=function(){

	}
	return{
		project:project,
		clear:clear
	}
}])
.factory('userListModel',[function(){
	//TEST
	var randName=function(){return (Math.random()).toString(36).substr(2).replace(/[0-9]/g,'');}
	
	var users=[];
	for(var i=0;i<100;i++){
		users[i]={
			avatar:'',
			name: randName(),
			id:i
		}
	}
	return{
		users:users
	}
}])
.factory('projectModel', [function () {
	var project={
		projectMember:[{image:'img/animals/3giraffe_readyfordone.png',name:'Siqi Zhuo'},
			{image:'img/animals/6lion_readyfordone.png',name:'Jason Wu'},
			{image:'img/animals/3giraffe_readyfordone.png',name:'Siqi Zhuo'}],
		title:'kjscnadscaca',
		description:'dabxjkasbcxhjasbcas',
		plannedPeriod:'2016.01-2016.04',
		owner:'Siqi Zhuo',
		image:['http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg',
			'http://www.pp3.cn/uploads/allimg/111118/10562Cb5-13.jpg']
	}
	return{
		project:project
	}
}])