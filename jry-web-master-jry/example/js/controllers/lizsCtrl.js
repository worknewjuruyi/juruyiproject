//对应信息披露里的页面内容
/*静态页面_理财知识*/
// mainModule.controller('lizsCtrl', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService', '$animate', function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$animate) {
// 		$rootScope.title = '理财知识-菠菜理财';
// 		resourceService.getJsonServer($scope,$filter('静态接口对照表')('理财知识'),{},'理财知识');
// 		$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
// 			switch(type) {
// 				case "理财知识":
// 					$scope.helps = data.result;
// 					for (var i = 0; i < $scope.helps.length; i++) {
// 						$scope.helps[i].text = $scope.helps[i].text;
// 					}
// 				break;
// 			}
// 		});
// }]);
/* 静态页面_安全保障 */
mainModule.controller('aqbzCtrl', ['$rootScope','$scope','$location', function($rootScope,$scope,$location) {
	$rootScope.title = '安全保障-菠菜理财';
	if($location.$$search.menuName != undefined){
		var obj={};
		obj.name=$location.$$search.menuName;
		$rootScope.$broadcast('myEvent.WHDR_Ctrl',obj);
    }
}]);

/* 静态页面_菠菜概况 */
mainModule.controller('JSGKCtrl', ['$rootScope','$scope','$location', '$window',function($rootScope,$scope,$location,$window) {
    $window.scrollTo(0,0)
	$rootScope.title = '公司简介-菠菜理财';
	if($location.$$search.menuName != undefined){
		var obj={};
		obj.name=$location.$$search.menuName;
		$rootScope.$broadcast('myEvent.WHDR_Ctrl',obj);
    }

	var mySwiper2 = new Swiper('.bghj-box .swiper-container', {
        slidesPerView: 3,
        loop: true,
		nextButton: '.bghj-box .swiper-button-next',
    	prevButton: '.bghj-box .swiper-button-prev',
		spaceBetween:30
    });
}]);

/* 静态页面_菠菜概况 */
mainModule.controller('YYYZCtrl', ['$rootScope','$scope','$location', function($rootScope,$scope,$location) {
	$rootScope.title = '公司简介-菠菜理财';
	$scope.showType = 'a';
	if($location.$$search.menuName != undefined){
		var obj={};
		obj.name=$location.$$search.menuName;
		$rootScope.$broadcast('myEvent.WHDR_Ctrl',obj);
    }
}]);

/* 静态页面_法律法规 */
mainModule.controller('flfgCtrl', ['$rootScope','$scope', function($rootScope,$scope) {
	$rootScope.title = '法律保障-菠菜理财';
}]);

/* 静态页面_联系我们 */
mainModule.controller('lxwmCtrl', ['$rootScope','$scope', function($rootScope,$scope) {
	$rootScope.title = '联系我们-菠菜理财';
}]);

/* 静态页面_联系我们 */
mainModule.controller('gltdCtrl', ['$rootScope','$scope', function($rootScope,$scope) {
	$rootScope.title = '信息披露-管理团队';
}]);