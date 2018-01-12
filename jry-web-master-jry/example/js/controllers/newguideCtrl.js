mainModule.controller('newguideCtrl', ['$location', '$rootScope', '$localStorage', '$scope', '$http', 'resourceService', '$filter', function ($location, $rootScope, $localStorage, $scope, $http, resourceService, $filter) {
	$scope.showStep = 1;
	$scope.next = function () {
		if ($scope.showStep < 4) {
			$scope.showStep++;
		} else {
			$scope.showStep = 1;
		}
	};
	$scope.prev = function () {
		if ($scope.showStep > 1) {
			$scope.showStep--;
		} else {
			$scope.showStep = 4;
		}
	};
	$scope.changeStep = function(i){
		$scope.showStep = i;
	}
	resourceService.queryPost($scope, $filter('交互接口对照表')('获取产品详情页'), { 
		deadlineOne: 30,
		deadlineTwo: 60, 
		deadlineThree: 180 
	}, { name: '获取产品详情页' });
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
		switch (type.name) {
			case '获取产品详情页':
				if (data.success) {
					$scope.productA = data.map.list[0];
					$scope.productB = data.map.list[1];
					$scope.productC = data.map.list[2];
				}
				break;
		}
	})
}])