//guarantee.html
/* 安全保障 */
mainModule.controller('guaranteeCtrl', ['$rootScope','$scope','$location',
    '$localStorage','$filter','resourceService','$window',
	function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$window) {
        $window.scrollTo(0,0)
    $rootScope.title = '安全保障-菠菜理财';
	if($location.$$search.toFrom != undefined || $location.$$search.recommCode!= undefined){
		$localStorage.webFormPath = $location.$$search;
	};
	if($location.$$search.menuName != undefined){
		var obj={};
		obj.name=$location.$$search.menuName;
		$rootScope.$broadcast('myEvent.WHDR_Ctrl',obj);
    }
	if (!$filter('isRegister')().register) {
		$scope.login = false;
	} else {
		$scope.login = true;
	}
	/*退出*/
	$scope.userOut = function (event) {
		$filter('清空缓存')();
		resourceService.queryPost($scope,$filter('交互接口对照表')('退出接口'),{},'退出');

		if($location.$$url.indexOf('myAccount') != -1){
            $filter("跳转页面")('denLu','main.myAccount.accountHome','dl');
        }
	};
	$scope.gotoLoginPage = function() {
		$filter("clickTouZiGotoWhere")($scope,'main.myAccount.accountHome');
	};
    //动画
	window.onscroll=function () {
	    if($(window).scrollTop()>39){
	        $("#wrapperId").addClass("asmallClass");
	        $("#abigId").addClass("abigClass");
	    }
	    else{
	        $("#wrapperId").removeClass("asmallClass");
	        $("#abigId").removeClass("abigClass");	
	    }
		if($(window).scrollTop()>=100&&$(window).scrollTop()<176){
	        $("#gqkg4").addClass("animated pulse");
		}else if($(window).scrollTop()>=176&&$(window).scrollTop()<474){
	        $("#gqkg5").addClass("animated4 bounceInUp");
		}else if($(window).scrollTop()>=474&&$(window).scrollTop()<1028){
	        $("#gqkg9").addClass("animated4 bounceInLeft");
	        $("#gqkg10").addClass("animated4 bounceInRight");
	    }
	    else if($(window).scrollTop()>=1028&&$(window).scrollTop()<1319){
	        $("#gqkg6").addClass("animated4 bounceInUp");
	    }
	    else if($(window).scrollTop()>=1319&&$(window).scrollTop()<1652){
	        $("#gqkg11").addClass("animated4 bounceInLeft");
	        $("#gqkg12").addClass("animated4 bounceInRight");
	    }
	    else if($(window).scrollTop()>=1652){
	        $("#gqkg13").addClass("animated4 bounceInUp");
	    }
	}

}])