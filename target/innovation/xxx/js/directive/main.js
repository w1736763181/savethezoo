var direc = angular.module('mainDirective', []);
direc.directive('modal',[function(){
	return {
		restrict: 'AEC',
		templateUrl: 'template/part/modal.html',
		scope:{
			title:'@',
			content:'@',
			ok:'@',
			cancel:'@',
			fnOk:'&',
			fnCancel:'&'
		},
		link:function(scope, element, attrs){
			scope['showOk']=true;
			scope['showCancel']=true;
		}
	}
}])
.directive('navTop',[function(){
	return {
		restrict: 'AE',
		templateUrl: 'template/part/nav.html',
		scope:{
			center:'@',
			left:'@',
			right:'@',
			fnLeft:'&',
			fnRight:'&',
		},
		link:function(scope, element, attrs){
			scope['showLeft']=true;
			scope['showRight']=true;
		}
	}
}])
.directive('changeFile',[function(){
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.changeFile);
			element.bind('change',onChangeHandler);
			
			scope.$on('$destroy', function(){
				element.unbind('change')					
			})
		}
	};
}])
.directive('wrapScroll',[function(){
	return {
		restrict: 'AE',
		link: function (scope, element, attrs) {
			setTimeout(function(){
				var myScroll = new IScroll('#'+attrs.wrapScroll);
				scope.$on('$destroy', function(){
					myScroll.destroy();
					myScroll = null;
				})
			},0)
		}
	};
}])
.directive('listBottom',[function(){
	return {
		restrict: 'AEC',
		templateUrl:'template/part/list_bottom.html'
	};
}])
.directive('modal2',[function(){
	return {
		restrict: 'AEC',
		replace:true,
		scope:{
			show2:'=',
			pjPic:'=',
			content:'='
		},
		templateUrl:'template/part/modal2.html',
		link:function(scope,elem,attrs){
			scope.close=function(){
				scope.show2=false;
			}
		}
	};
}])