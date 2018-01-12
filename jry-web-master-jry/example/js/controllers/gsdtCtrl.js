//jt/GSDT.html
/*新闻列表*/
mainModule.controller('gsdtCtrl', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService','$window',
	function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$window) {
    $window.scrollTo(0,0)
	$rootScope.title = '公司动态-菠菜理财';
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "新闻列表":
				if (data.success) {
					$scope.news = data.map.page.rows;
					$scope.bill = data.map.page;
					$scope.bill.pages = [];
					for(var i=0;i<parseInt($scope.bill.totalPage);i++){
						$scope.bill.pages[i]=i+1;
					};
				} else {
				}
				break;
		};
	});
	$scope.$emit('myEvent.WHDR_Ctrl', {
            "memnTitle": "媒体报道",
            "name": "GSDT",
            "url": "main.jt.GSDT"
        });
	resourceService.queryPost($scope, $filter('交互接口对照表')('新闻列表'),{
		pageOn:1,
		pageSize:5,
		proId:1
	},'新闻列表');

	$scope.onXWclick = function(item) {
		console.log(item)
		$localStorage.newsId = item.artiId;
		console.log($localStorage.newsId)
		$filter('跳转页面')('type','main.jt.GSDT','main.jt.XWXQ',item,'菠菜新闻',{name:'菠菜新闻',url:'main.jt.GSDT'});
	};
	// $scope.onClickPage=function (type,pageNum,listtype) {
	// 	switch(type){
	// 		case "beforPage":
	// 			if($scope.bill.pageOn > 1){$scope.bill.pageOn -=1;goPage($scope.order,$scope.bill.pageOn);};
	// 		break;
	// 		case "currentPage":
	// 			$scope.bill.pageOn = pageNum;goPage($scope.order,$scope.bill.pageOn);
	// 		break;
	// 		case "nextPage":
	// 			if($scope.bill.pageOn < $scope.bill.pages.length){$scope.bill.pageOn +=1;goPage($scope.order,$scope.bill.pageOn);};
	// 		break;
	// 	};
	// }
	// function goPage(order,pageOn,type) {
	// 	// 翻页
	// 	var obj = {}
	// 	obj.proId = 1; 
	// 	obj.pageOn = pageOn; 
	// 	obj.pageSize = 5;
	// 	if (type != undefined) {
	// 		obj.type = type;
	// 	}
	// 	resourceService.queryPost($scope,$filter('交互接口对照表')('新闻列表'),obj,'新闻列表');
	// };
	$scope.goPage = function (scope) {
        var obj={};
        obj.pageOn =  scope.bill.pageOn;
        // obj.pageSize = scope.bill.pageSize;
        obj.pageSize = 5;//每页显示数量
        obj.proId = 1;
        resourceService.queryPost($scope, $filter('交互接口对照表')('新闻列表'), obj, '新闻列表');
    };
}]);