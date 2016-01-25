var mainCtcl = angular.module('mainController', []);



mainCtcl.controller('homepageCtrl', ['$scope','userMeModel', function($scope,userMeModel){
	$scope.logInAndOut=function(go,out){
		if(!$scope.isLogin){
			go('/user/login', 'slideLeft');
		}else{
			out();
		}
	}
	$scope.logout=function(){
		userMeModel.logout();
		$scope.isLogin=false;
		$scope.loginOrOut='Login';
	}
	$scope.isLogin=userMeModel.isLogin;
	$scope.loginOrOut=($scope.isLogin?'Logout':'Login')
}])
.controller('register1Ctrl', ['$scope', function($scope){
	//
}])
.controller('register2Ctrl', ['$scope', function($scope){
	//
}])
.controller('register3Ctrl', ['$scope','upload' ,'DEFAULT_AVATAR', function($scope,upload,DEFAULT_AVATAR){
	$scope.imgSrc=DEFAULT_AVATAR;
	
	$scope.uploadFile=function(img){
		var fd = new FormData();
		fd.append('img',img);
		
		upload.upload(fd,function(data){
			$scope.imgSrc='uploads/1.png';
		})
	}

	$scope.clearAndGo=function(fn,a,b){
		$scope.imgSrc=DEFAULT_AVATAR;
		fn(a,b);
	}
}])
.controller('register4Ctrl', ['$scope', function($scope){
	$scope.show=false;
	$scope.save=function(){
		$scope.show=true;
	}
	$scope.fnOk=function(){
		//console.log(1)
	}
	$scope.fnCancel=function(){
		$scope.show=false;
	}	
}])
.controller('loginCtrl', ['$scope', 'DEFAULT_AVATAR','userMeModel', function($scope,DEFAULT_AVATAR,userMeModel){
	$scope.imgSrc=DEFAULT_AVATAR;
	$scope.show=false;
	$scope.login=function(username,pwd){
		userMeModel.login(username,pwd);
		
		$scope.show=true;
		//SUCCESS
		$scope.title="SUCCESS";
		$scope.content="LOGIN SUCCESS!";
		$scope.fnOk=function(go){
			go();
		}
		//FAILED
	}
}])
.controller('userListCtrl', ['$scope', function($scope){
	
}])
.controller('userAddProjectCtrl', ['$scope', 'projectCreateModel', 'userListModel', function($scope,pj,userList){
	var users=angular.copy(userList.users);
	users.sort(function(a,b){
		return a['name'].localeCompare(b['name']);
	})

	var userListGroup={},f,temp;
	for(var i=0,len=users.length;i<len;i++){
		temp=users[i];
		if(temp['name'][0]!=f){
			f=temp['name'][0];
			userListGroup[f]=[];
		}
		if(pj.project.selectedUser.some(function(a){
			return a.id==temp.id;
		})){
			temp.selected=true;
		}
		
		userListGroup[f]['push'](temp);
	}
	$scope.userListGroup=userListGroup;
	$scope.users=users;
	
	$scope.submit=function(o,go){
		pj.project.selectedUser=o;
		userList.users.map(function(a){
			if(o.some(function(b){
				return b.id==a.id;
			})){
				o.selected=true;
			}else{
				o.selected=false;
			}
			
			return o;
		});
		go();
	}
	
}])
.controller('ideaCreateCtrl',['ideaModel','$scope', 'userMeModel', function(ideaM,$scope,userMeModel){

	$scope.idea=ideaM.idea;

	$scope.remove=function(idx){
		$scope.idea.imgsSrc.splice(idx,1);
	}

	$scope.add=function(file){
		console.log(file)
	}

	$scope.change=function(e){
		var file=e.target.files[0];
		if(!file){
			return;
		}
		$scope.idea.files.push(file);
		$scope.idea.imgsSrc.push(URL.createObjectURL(file))
		$scope.$digest()
	}
}])
.controller('ideaListCtrl',['$scope','ideaListModel',function($scope,list){
	$scope.ideaList=list.get();
	$scope.listType=1;
	
}])
.controller('projectListCtrl',['$scope','projectListModel',function($scope,list){
	$scope.projectList=list.get();
	$scope.listType=2;
}])
.controller('projectCreateCtrl',['$scope','projectCreateModel', 'userMeModel',function($scope,pj,userMeModel){
	//userMeModel.needLogin();
	
	$scope.project=pj.project;
	
	$scope.remove=function(idx){
		$scope.project.imgsSrc.splice(idx,1);
	}
	
	$scope.change=function(e){
		var file=e.target.files[0];
		if(!file){
			return;
		}
		$scope.project.files.push(file);
		$scope.project.imgsSrc.push(URL.createObjectURL(file))
		$scope.$digest();
	}
	var selected=pj.project.selectedUser;
	
	$scope.selectedUser=selected;
	
	$scope.delUser=function(id){
		selected.splice(id,1);
	}
}])
.controller('ideaDetailCtrl', ['$scope', 'ideaModel', '$routeParams', function ($scope, idea, $routeParams) {
	$scope.idea = idea.get();
}])
.controller('projectDetailCtrl', ['$scope', 'projectModel', '$routeParams', function ($scope, project, $routeParams){
	$scope.project = project.project;
}])