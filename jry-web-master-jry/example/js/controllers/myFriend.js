// 我的好友
mainModule.controller('myFriend', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService', '$state',
	function($rootScope,$scope,$location,$localStorage,$filter,resourceService,$state) {
    if(!$localStorage.user){
		$state.go("login")
	}
	$rootScope.title = '我的邀请-菠菜理财';
	$scope.cpoyFin = false;
	$scope.myPhone = $localStorage.user.mobilephone;
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case "我的好友邀请":
				if (data.success) {
					$scope.myinvite = data.map;

					$scope.friend = data.map.page.rows;
					$scope.mylistPage = data.map.page;
					$scope.mylistPage.pages = [];

					for(var i = 0; i < parseInt($scope.mylistPage.totalPage); i ++){
						$scope.mylistPage.pages[i] = i+1;
					}
				}
			break;
		};
	});

	// 复制并打开链接
	$scope.copyNow = function() {
		$('#copyTxt').select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		$scope.cpoyFin = true;
	};

	// 好友分页
	$scope.mylistPage = {
		pageOn: 1,
		pageSize: 10
	};

	$scope.goPage = function(scope) {
        var obj = {};
        obj.pageOn = scope.mylistPage.pageOn;
        obj.pageSize = scope.mylistPage.pageSize;
        resourceService.queryPost($scope,$filter('交互接口对照表')('我的好友邀请'),{pageOn: obj.pageOn,pageSize: obj.pageSize},'我的好友邀请');
    };
    $scope.goPage($scope);

	$scope.changePage = function(type,pageNum) {
        switch(type){
            case "beforPage":
                if($scope.mylistPage.pageOn > 1){$scope.mylistPage.pageOn -=1;$scope.goPage($scope);};
            break;
            case "currentPage":
                $scope.mylistPage.pageOn = pageNum;$scope.goPage($scope);
            break;
            case "nextPage":
                if($scope.mylistPage.pageOn < $scope.mylistPage.pages.length){$scope.mylistPage.pageOn +=1;$scope.goPage($scope);};
            break;
        };
    };

}]);