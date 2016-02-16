var mainCtcl = angular.module('mainController', []);



mainCtcl.controller('homepageCtrl', ['$scope','userModel', function($scope,userModel){
		$scope.logInAndOut=function(go,out){
			if(!$scope.isLogin){
				go('/user/login', 'slideLeft');
			}else{
				out();
			}
		}
		$scope.logout=function(){
			userModel.logout();
			$scope.isLogin=false;
			$scope.loginOrOut='Login';
		}
		$scope.isLogin=userModel.isLogin;
		$scope.loginOrOut=($scope.isLogin?'Logout':'Login')
	}])
	.controller('register1Ctrl', ['$scope','userModel', function($scope,user){
		$scope.user=user.model;
	}])
	.controller('register2Ctrl', ['$scope','userModel', function($scope,user){
		$scope.user=user.model;
	}])
	.controller('register3Ctrl', ['$scope','DEFAULT_AVATAR','userModel', function($scope,DEFAULT_AVATAR,user){
		$scope.imgSrc=DEFAULT_AVATAR;
		$scope.user=user.model;
		
		$scope.uploadFile=function(img){
			var url=URL.createObjectURL(img);
			$scope.imgSrc=url;
			$scope.user.headSrc=url;
			$scope.user.image=img;
			$scope.$digest();
		}

		$scope.clearAndGo=function(fn,a,b){
			$scope.imgSrc=DEFAULT_AVATAR;
			$scope.user.image=undefined;
			$scope.user.headSrc='';
			fn(a,b);
		}
	}])
	.controller('register4Ctrl', ['$scope', 'userModel', function($scope, user){
		$scope.show=false;
		$scope.user=user.model;
		
		$scope.save=function(){
			//$scope.show=true;
			//$routeParams
			user.register();
		}
		$scope.fnOk=function(){
			//console.log(1)
		}
		$scope.fnCancel=function(){
			$scope.show=false;
		}
	}])
	.controller('loginCtrl', ['$scope', 'DEFAULT_AVATAR','userModel','$location', function($scope,DEFAULT_AVATAR,userModel,$location){
		$scope.imgSrc=DEFAULT_AVATAR;
		$scope.show=false;
		$scope.disableBtn=false;

		$scope.login=function(username,pwd){
			$scope.disableBtn=true;
			userModel.login(username,pwd,function success(){
				//SUCCESS
				$scope.show=true;
				$scope.title="SUCCESS";
				$scope.content="LOGIN SUCCESS!";
				$scope.fnOk=function(go){
					go($location.search().url,'slideLeft');
				}
				$scope.disableBtn=false;
			},function error(){
				$scope.show=true;
				$scope.title="ERROR";
				$scope.content="LOGIN ERROR!";
				$scope.fnOk=function(go){
					$scope.show=false;
				}
				$scope.disableBtn=false;
			});
		}
	}])
	.controller('userInfoCtrl', ['$scope','$routeParams', 'userModel', 'projectModel', 'ideaModel', function($scope, $routeParams, user, pjModel, ideaModel){
		var id=$routeParams.id,userinfo;
		
		if(id==+id){
			$scope.listType=3;
			$scope.userType=0;   //others
			
			user.get_user(id,function(user){
				userinfo=user;
				$scope.name=userinfo.name;
				$scope.me=userinfo;
			});
		}else{
			$scope.listType=4;
			$scope.userType=1;   //me
			$scope.name="Me";
			id=user.model.id;
			$scope.me=user.model;
		}
		
		$scope.type=1;
		
		pjModel.get_list(function(data){
			$scope.list=data;
		},function(){
			
		});
		
		$scope.changeType=function(i){
			$scope.type=i;
			$scope.list= i==1?ideaModel.get_by_userid():pjModel.get_by_userid();
		}
	}])	
	.controller('coinCtrl', ['$scope', 'userModel', 'coinModel', function($scope, me, coin){
		coin.get(me.model.id, function(da){
			$scope.list=da;
		},function(){
			//
		});
	}])	
	.controller('userMsgCtrl', ['$scope', 'userModel', 'messageModel', 'ANIMAL_IMAGES', function($scope, me, msg, ANIMAL_IMAGES){
		msg.get(me.model.id,function(data){
			$scope.list=data;
		},function(){
			//
		});
		$scope.show=false;
		$scope.show2=false;
		$scope.showModal=function(d,type,pjType){
			if(type==1){
				$scope.show=true;
				$scope.content=d;
				$scope.reject=function(){
					$scope.show=false;
				}
			}else{
				$scope.show2=true;
				$scope.content=d;
				$scope.pjPic=ANIMAL_IMAGES[pjType][3];
			}
		}
	}])	
	.controller('userListCtrl', ['$scope', 'userModel', function($scope,user){
		user.get_list(function(data){
			$scope.list=data;
			$scope.total=data.length;
			$scope.listType=3;			
		},function(){
			//
		});
	}])
	.controller('userAddProjectCtrl', ['$scope', 'projectModel', 'userModel', function($scope,pj,user){
		user.get_list(function(d){
			usersOrin=d;
			var users=angular.copy(usersOrin);
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
		})

		$scope.submit=function(o,go){
			pj.project.selectedUser=o;
			usersOrin.map(function(a){
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
	.controller('ideaCreateCtrl',['ideaModel','$scope', 'userModel', function(ideaM,$scope,userModel){
		$scope.idea=ideaM.idea;
		$scope.username=userModel.model.name;
		$scope.show=false;
		$scope.hasSubmitted=false;
		
		$scope.remove=function(idx){
			$scope.idea.imgsSrc.splice(idx,1);
			$scope.idea.files.splice(idx,1);
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
		
		$scope.submit=function(){
			if($scope.hasSubmitted){
				return;
			}
			$scope.hasSubmitted=true;
			ideaM.post(userModel.model.id,function success(){
				$scope.show=true;
				$scope.title="Create Success!";
				$scope.fnOk=function(go){
					ideaM.clear();
					go('/homepage','slideLeft');
				}
			},function error(){
				$scope.show=true;
				$scope.hasSubmitted=false;
				$scope.title="Create Failed!"
				$scope.content="please try it again."
				$scope.fnOk=function(fn){
					$scope.show=false;
				}				
			});
		}
	}])
	.controller('ideaDetailCtrl', ['$scope', 'ideaModel', '$routeParams', function ($scope, idea, $routeParams) {
		idea.get($routeParams.id,function(data){
			$scope.idea = data;
		},function(){
			
		});
	}])	
	.controller('ideaListCtrl',['$scope','ideaModel','userModel',function($scope,idea,user){
		var id=user.model.id;
		//not login and id=0;
		if(id==undefined){
			id=0;
		}
		idea.get_list(id,function(data){
			$scope.ideaList=data;	
		},function(err){
			
		});
		$scope.listType=1;
		//$scope.isVoted=false;
		$scope.toggleVote= function (index) {
			if(!$scope.ideaList[index].isVoted){
				$scope.ideaList[index].isVoted=true;
				$scope.ideaList[index].like++;
			}
			else {
				$scope.ideaList[index].isVoted = false;
				$scope.ideaList[index].like--;
			}
		}

	}])
	.controller('projectListCtrl',['$scope','projectModel',function($scope,pj){
		pj.get_list(function(d){
			$scope.projectList=d;
		});
		$scope.listType=2;
		$scope.toggleVote= function (index) {
			if(!$scope.projectList[index].isVoted){
				$scope.projectList[index].isVoted=true;
				$scope.projectList[index].like++;
			}
			else {
				$scope.projectList[index].isVoted = false;
				$scope.projectList[index].like--;
			}
		}
	}])
	.controller('projectCreateCtrl',['$scope','projectModel', 'userModel',function($scope,pj,userModel){
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
		
		$scope.submit=function(){
			pj.post(function(){
				
			},function(){
				
			});
		}
	}])
	.controller('projectDetailCtrl', ['$scope', 'projectModel', '$routeParams', function ($scope, project, $routeParams){		
		project.get($routeParams.id,function(d){
			$scope.project = d;
		});
	}])