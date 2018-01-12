/*lee 我的账户*/
mainModule.controller('AccountaccountHomeCtrl', ['$rootScope','$scope', '$state', '$localStorage', 'resourceService','$filter','ngDialog','$location',function($rootScope,$scope, $state, $localStorage,resourceService,$filter,ngDialog,$location) {
	$filter('isLogin')($scope);
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;
	$scope.summaryContents= $localStorage.summaryContents;
	$localStorage.activeText = {name:'我的账户',url:'main.main.myAccount.accountHome'};
	$scope.user={};
	$scope.user.product = [];
	$rootScope.title='我的账户-菠菜理财';
	$rootScope.activeNav = 'account';
	if ($localStorage.user) {
		$scope.myPhone = $localStorage.user.mobilephone;
	}
	$scope.closeDialog = function() {
		resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
		resourceService.queryPost($scope,$filter('交互接口对照表')('邀请好友统计'),{afid: $location.$$search.id},'邀请好友统计');
		ngDialog.closeAll();
	};

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case '用户信息':
				if (data.success) {
					$localStorage.user = data.map;
				}
				break;
			case "资产首页":
				$scope.accuntHome = data.map;
				$scope.investList = data.map.investList;
				$scope.infoList = data.map.infoList;
				$scope.fundsRecord = data.map.fundsRecord;
				$rootScope.isExperience = data.map.isExperience;
				$scope.drMemberFavourableList = data.map.drMemberFavourableList;
				$scope.experienceAmount = data.map.experienceAmount;
				$scope.isFuiou = data.map.isFuiou;
				if ($scope.drMemberFavourableList.length > 0) {
					$scope.hasNoACT = true;
				} else {
					$scope.hasNoACT = false;
				}

				if(!$localStorage.promotefirstTime){
			        $localStorage.promotefirstTime = new Date().getDate();
			        $localStorage.promoteUser = $localStorage.user.mobilephone;
					resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
			    }else{
			        var day = new Date().getDate();
			        if ($localStorage.promoteUser != undefined && $localStorage.promoteUser == $localStorage.user.mobilephone) {
				        if($localStorage.promotefirstTime != day){
				        	resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
				            $localStorage.promotefirstTime = day;
				        }
			        } else if ($localStorage.promoteUser != undefined && $localStorage.promoteUser != $localStorage.user.mobilephone) {
			        	$localStorage.promoteUser = $localStorage.user.mobilephone;
			        	$localStorage.promotefirstTime = day;
			        	resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
			        }
			    }
			break;
			case "我的账户新手":
				$localStorage.product=$scope.newhand = data.map.newhand;
			break;
			case "邀请好友统计":
				if (data.success) {
					$scope.inviteInfo = data.map;
				}
			break;
		};
	});
	resourceService.queryPost($scope,$filter('交互接口对照表')('产品列表'),{},'我的账户新手');
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
	resourceService.queryPost($scope, $filter('交互接口对照表')('邀请好友统计'),{},'邀请好友统计');
	// 用户信息
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'用户信息');
	}
}])