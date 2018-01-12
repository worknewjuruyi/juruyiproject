//invite.html
mainModule.controller('inviteCtrl', ['$state','$rootScope','$scope','$location','$localStorage','$filter','resourceService','ngDialog',function($state,$rootScope,$scope,$location,$localStorage,$filter,resourceService,ngDialog) {
	$rootScope.title = '有钱一起赚，人脉变钱脉';

	
	$localStorage.activityUrl = 'extend.invite';
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;

	if ($location.$$search.toFrom != undefined || $location.$$search.recommCode != undefined || $location.$$search.tid != undefined) {
        $localStorage.webFormPath = $location.$$search;
    }
    $scope.showRulesA = $scope.showRulesB = $scope.showRulesC = false;

	$scope.isLogin = $filter('isRegister')().register;
	// if ($scope.isLogin) {
	// 	resourceService.queryPost($scope,$filter('交互接口对照表')('我的好友邀请'),{},'我的好友邀请');
	// }
	resourceService.queryPost($scope,$filter('交互接口对照表')('三重礼排行榜'),{},'三重礼排行榜');
	if ($localStorage.user) {
		$scope.myPhone = $localStorage.user.mobilephone;
	}

	$scope.closeDialog = function() {
		ngDialog.closeAll();
	};
     
	// 监听退出是否成功 
	$rootScope.$on('exitSuccess', function(event, flag) {//并未找到exitSuccess
		console.log(1111)
		if (flag) {
			$scope.isLogin = false;
		}
	});

	// 复制并打开链接
	$scope.cpoyFin = false;
	$scope.copy = function() {//此函数无用
		$('#mycopy').select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		alert("已复制好，可贴粘。");
	};
	$scope.copyNow = function() {//此函数有效
		$('#copyTxt').select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		$scope.cpoyFin = true;
	};

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
		switch(type){
			// case "我的好友邀请":
				// $scope.user = data.map;
				// $scope.myPhone = data.map.;
			// break;
			case "三重礼排行榜":
			// data.map.top = [
            //         {rownum:1,mobilePhone:'139****1234',amount:8000},
            //         {rownum:2,mobilePhone:'139****1234',amount:7000},
            //         {rownum:3,mobilePhone:'139****1234',amount:6000},
            //         {rownum:4,mobilePhone:'139****1234',amount:5000},
            //         {rownum:5,mobilePhone:'139****1234',amount:4000},
            //         {rownum:6,mobilePhone:'139****1234',amount:3000},
            //         {rownum:7,mobilePhone:'139****1234',amount:2000},
            //         {rownum:8,mobilePhone:'139****1234',amount:1000},
            //         {rownum:9,mobilePhone:'139****1234',amount:800},
            //         {rownum:10,mobilePhone:'139****1234',amount:80},
            //     ]
				if (data.success) {
					$scope.top = data.map.top;
					$scope.recommCode = data.map.recommCode;
				}
			break;
		}
	});
}])