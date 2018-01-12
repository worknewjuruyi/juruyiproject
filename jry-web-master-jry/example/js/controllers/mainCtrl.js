var mainModule = angular.module('mainModule', ['ngStorage']);
mainModule.controller('mainCtrl', function ($scope, $rootScope, $http, $state,
											$stateParams, $localStorage, $location, resourceService,
											communicationService, $filter, ngDialog) {
	$scope.state = $state.current.name;
	$rootScope.title = "菠菜理财—网贷投资理财，国企控股平台";
	$filter('isLogin')($scope);
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
		switch (type) {
			case "资产首页":
				if (data.success) {
					$filter("clickTouZiGotoWhere")($scope, 'main.myAccount.accountHome');
				}
				break;
		};
	});
	$scope.$on('$stateChangeSuccess',function(){
		if($location.$$path.match(/^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+[^\/]/)){
            $rootScope.currentPath = $location.$$path.match(/^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+[^\/]/)[0];
		}
		else{
            $rootScope.currentPath="/main/home"
		}
	})
	$scope.gotoLoginPage = function (type, event) {
		switch (type) {
			case "home"://
				$rootScope.activeNav = 'home';
				break;
			case "新手指引"://优选
				$filter('跳转页面')('', 'main.home', 'main.guide', '新手指引', null, { name: '', url: 'main.guide' });
				break;

			case "安全保障"://优选
				$filter('跳转页面')('', 'main.home', 'main.guarantee', '安全保障', null, { name: '安全保障', url: 'main.guarantee' });
				break;
			case "myAccount"://我的资产
				// resourceService.queryPost($scope,$filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
				$filter("clickTouZiGotoWhere")($scope, 'main.myAccount.accountHome');
				break;
			case "帮助中心"://我的资产
				$localStorage.showQA = false;
				$filter('跳转页面')('', 'main.home', 'main.jt.help', '帮助中心', null, { name: '帮助中心', url: 'main.jt.help' });
				break;
			case "理财课堂"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.LCZS', '帮助中心', null, { name: '帮助中心', url: 'main.jt.LCZS' });
				break;
			case "新手指引"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.guide', '', null, { name: '', url: 'main.guide' });
				break;

			case "信息披露"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.JSGK', '信息披露', null, { name: '信息披露', url: 'main.jt.JSGK' });
				break;
			case "菠菜概况"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.JSGK', '信息披露', null, { name: '信息披露', url: 'main.jt.JSGK' });
				break;
			case "法律法规"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.FLFG', '信息披露', null, { name: '信息披露', url: 'main.jt.FLFG' });
				break;
			case "联系我们"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.LXWM', 'LXWM', null, { name: '信息披露', url: 'main.jt.LXWM' });
				break;
			case "aboutus"://我的资产
				$filter('跳转页面')('', 'main.home', 'main.jt.JSGK', 'JSGK', null, { name: '信息披露', url: 'main.jt.JSGK' });
				break;
			default:
				$filter("跳转页面")(type, 'main.home', 'login');
				break;
		};
	};
	/*退出*/
	$scope.userOut = function (event) {
		$filter('清空缓存')();
		resourceService.queryPost($scope, $filter('交互接口对照表')('退出接口'), {}, '退出');

		if ($location.$$url.indexOf('myAccount') != -1) {
			$filter("跳转页面")('denLu', 'main.myAccount.accountHome', 'login');
		};
		$rootScope.$emit('exitSuccess', true);
	};

})

//  滚动固定导航栏
window.onscroll = function() {
    if($(window).scrollTop()>39)
    {
		$("#wrapperId").addClass("asmallClass");
        $("#abigId").addClass("abigClass");
    }
    else{
        $("#wrapperId").removeClass("asmallClass");
        $("#abigId").removeClass("abigClass");

    }

}


/* si 404页面 */
	mainModule.controller('falseCtrl', ['$scope', function ($scope) {
	}
]);













