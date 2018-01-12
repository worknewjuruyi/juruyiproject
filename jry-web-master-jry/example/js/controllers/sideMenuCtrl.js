/*我的资产主控*/
mainModule.controller('sideMenuCtrl', function($rootScope,$scope,$location,$localStorage,resourceService) {
	$scope.$on('$stateChangeSuccess',function(){
		$scope.currentPath = $location.$$path;
	})
	$scope.onClickMenuItem = function(event){
		$scope.currentPath = '';
		$(event.target).parent('.side-mode').toggleClass('active-mode').siblings().removeClass('active-mode');
	}
});