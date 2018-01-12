/*静态页面_帮助*/
mainModule.controller('helpCtrl', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService', '$animate', function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$animate) {
	$rootScope.title = '常见问题-菠菜理财';
	$rootScope.activeNav = 'aboutus';
	resourceService.getJsonServer($scope,$filter('静态接口对照表')('常见问题'),{},'常见问题');
	// $scope.false = true;
	if ($localStorage.showQA == true) {
		$scope.showQA = true;
		delete $localStorage.showQA;
	} else {
		$scope.showQA = false;
	}
	$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
		switch(type) {
			case "常见问题":
				$scope.helps = data.result;
				for (var i = 0; i < $scope.helps.length; i++) {
					$scope.helps[i].text = $scope.helps[i].text;
				}
			break;
		}
	});
	$scope.showMyQA = function(item) {
		if (item.text[0].stitle != undefined && $scope.showQA) {
			item.checked = true;
			$scope.showQA = false;
			$localStorage.showQA = false;
		}
		item.checked ? item.checked = false : item.checked = true;
	};
}]);

/*静态页面_帮助*/
mainModule.controller('storageInfoCtrl', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService', '$animate', function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$animate) {
	$rootScope.title = '银行存管-菠菜理财';
	$rootScope.activeNav = 'aboutus';
	resourceService.getJsonServer($scope,$filter('静态接口对照表')('存管问题'),{},'存管问题');
	// $scope.false = true;
	if ($localStorage.showQA == true) {
		$scope.showQA = true;
		delete $localStorage.showQA;
	} else {
		$scope.showQA = false;
	}
	$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
		switch(type) {
			case "存管问题":
				$scope.helps = data.result;
				for (var i = 0; i < $scope.helps.length; i++) {
					$scope.helps[i].text = $scope.helps[i].text;
				}
				if ($localStorage.showCGQA!=undefined) {
					if ($localStorage.showCGQA == 'recharge') {
						$scope.helps[4].checked=true;
					}
					delete $localStorage.showCGQA;
				}
			break;
		}
	});
	$scope.showMyQA = function(item) {
		if (item.text[0].stitle != undefined && $scope.showQA) {
			item.checked = true;
			$scope.showQA = false;
			$localStorage.showQA = false;
		}
		item.checked ? item.checked = false : item.checked = true;
	};
}]);

// 運營報告
mainModule.controller('wqqReportCtrl', ['$rootScope', function($rootScope) {
	$rootScope.title='运营报告-菠菜理财'
}]);
// 支付额度
mainModule.controller('zfedCtrl', ['$rootScope', function($rootScope) {
	$rootScope.title='交易额度-菠菜理财'
}]);
// 支付额度
mainModule.controller('ylktCtrl', ['$rootScope', function($rootScope) {
	$rootScope.title='支付引导-菠菜理财'
}]);