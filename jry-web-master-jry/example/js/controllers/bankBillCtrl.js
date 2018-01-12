//bill-list-new.html
/*lee 票据列表*/
mainModule.controller('bankBillCtrl', ['$scope', '$rootScope', '$http', '$state',
	'$stateParams', '$localStorage','$sessionStorage', 'resourceService','$filter',
	'communicationService','MAIN_MENU','ngDialog','$location','$window',
	function($scope, $rootScope, $http, $state, $stateParams, $localStorage,
			 $sessionStorage,resourceService,$filter,communicationService,MAINMENU,ngDialog,$location,$window) {
	$window.scrollTo(0,0)
	$filter('isLogin')($scope);
	$scope.order = 0;
	var pageSize = 10;//初始化每页显示数量
	$scope.bill={};//初始化分页器
	$scope.bill.pageOn = 1;//初始化分页器起始页码/点击停留页码
	$scope.youList = [];//初始化数据列表内容
	// $scope.path=$localStorage.pathObj;
	$rootScope.title = "理财产品列表-菠菜理财";
	// MAINMENU.menuname('bill','menu');
	goPage($scope.order,$scope.bill.pageOn);//初始化进入页面的列表页面
	// if ($location.$$path == '/main/bankBillList') {
	// 	goPage($scope.order,$scope.bill.pageOn,2);
	// 	goPage($scope.order,$scope.bill.pageOn,3);
	// 	goPage($scope.order,$scope.ju.pageOn,'聚划算产品列表');
    // }

	// if ($location.$$path == '/main/pastBillList') {
	// 	if ($location.$$search.type == undefined || $location.$$search.type == 1) {
	// 		$scope.pastType = '往期优选理财';
	// 		goPage($scope.order,$scope.bill.pageOn,'往期优选理财');
	// 	} else if ($location.$$search.type == 2) {
	// 		$scope.pastType = '往期90天活动标';
	// 		goPage($scope.order,$scope.bill.pageOn,'往期90天活动标');
	// 	} else if ($location.$$search.type == 3) {
	// 		$scope.pastType = '往期聚划算';
	// 		goPage($scope.order,$scope.ju.pageOn,'往期聚划算');
	// 	}

    // }
    
    //所有请求数据的接收列表
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case '用户信息':
				if (data.success) {
					$localStorage.user = data.map;
				}
				break;
			case "优选理财":
				$scope.youList = data.map.page.rows;//每页的数据列表
				
				console.log(data.map.page);//请求的每页数据总概括
				
				$scope.bill = data.map.page;
				$scope.bill.pages = [];//定义一个空数组存放分页的数量
				for(var i=0;i<parseInt($scope.bill.totalPage);i++){
					$scope.bill.pages[i]=i+1;
				}
				break;
		};
	});
    
	// 用户信息
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'用户信息');
	}
	
	//$scope.bill.pages.legth为总页码数量
    //$scope.bill.pageOn为分页器起始页
    //$scope.onClickPage为点击页码请求数据
    
	//点击后到何分页页面
	function goPage(order,pageOn,type) {
		// 翻页
		var obj = {},
			str = '';
		obj.order = order;
		obj.pageOn = pageOn; //点击后的起始页或者说是点击后的停留页面/页码
		obj.pageSize = 10;//定义每页显示列表的数量
		obj.productPrize = 1;
		obj.statuses = [5,6,8,9];
		obj.isActivity = 2;
		str = '优选理财';
		delete obj.productPrize;
		resourceService.queryPost($scope,$filter('交互接口对照表')('票据列表'),obj,str);//数据列表请求
	};
	//分页点击后事件（请求数据）
	$scope.onClickPage=function (type,pageNum,listtype) {
        $window.scrollTo(0,0)
		switch(type){
			case "beforPage"://上一页
				if($scope.bill.pageOn > 1){$scope.bill.pageOn -=1;goPage($scope.order,$scope.bill.pageOn,$scope.pastType);};
			break;
			case "currentPage"://当前页
				$scope.bill.pageOn = pageNum;goPage($scope.order,$scope.bill.pageOn,$scope.pastType);
			break;
			case "nextPage"://下一页
				if($scope.bill.pageOn < $scope.bill.pages.length){$scope.bill.pageOn +=1;goPage($scope.order,$scope.bill.pageOn,$scope.pastType);};
			break;
		};
	}
}])
