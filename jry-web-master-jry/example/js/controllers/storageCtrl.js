mainModule.controller('storageCtrl', ['$rootScope','$scope','$filter','resourceService','$location','md5','ngDialog','$state', function($rootScope,$scope,$filter,resourceService,$location,md5,ngDialog,$state) {
	$rootScope.title = '开通存管账户-菠菜理财';
	$rootScope.activeNav = 'account';
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;

	var $storageForm = $('#storageForm'),
		isSubmit = false;
	$scope.user = {};
	$scope.error = {};
	$scope.list = [];
	resourceService.getJsonServer($scope,'/data/area.json',{},'地区');
	resourceService.getJsonServer($scope,'/data/bank.json',{},'银行');
	$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
		switch(type) {
			case "地区":
				$scope.list = data.result;
			break;
			case "银行":
				$scope.bank = data.result;
			break;
		}
	});
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "资产首页":
				if (data.success) {
					$scope.accuntHome = data.map;
					$scope.isFuiou = data.map.isFuiou;
				}
			break;
			case "个人中心":
				if (data.success) {
					$scope.member = data.map;
					if ($scope.member.idCards != '') {
						$scope.user.realName = $scope.member.realName;
						$scope.user.idCards = $scope.member.idCards;
					}
					if ($scope.member.bankCode!=undefined) {
						$scope.user.bank = $scope.member.bankCode.substr(0,4);
					}
					if ($scope.member.bankNum!=undefined) {
						$scope.user.card = $scope.member.bankNum;
					}
				}
			break;
			case "存管信息":
				if (data.success) {
					$scope.storage = data.map;
					$scope.showSuccess = true;
				} else {
					$scope.errorMsg = data.errorMsg;
					$scope.showSuccess = false;
    				isSubmit = false;
				}
				$filter('开户成功弹窗')($scope);
			break;
		}
	});
	
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
	resourceService.queryPost($scope, $filter('交互接口对照表')('个人中心'),{},'个人中心');
	$scope.storageSubmit = function() {
		if (!isSubmit) {
			isSubmit = true;
			resourceService.queryPost($scope, $filter('交互接口对照表')('存管开户直连'),{
				cust_nm:$scope.user.realName,
				certif_id:$scope.user.idCards,
				city_id:$scope.user.city,
				parent_bank_id:$scope.user.bank,
				capAcntNo:$scope.user.card,
				password:md5.createHash($scope.user.paycode),
				rpassword:md5.createHash($scope.user.repaycode)
			},'存管信息');
		}
    };

    // 省市区
    // $scope.changeP = function () {
    //     $scope.user.city = "";
    // };

    $scope.closeDialog = function(flag) {
    	isSubmit = false;
        ngDialog.closeAll();
        if (flag) {
        	$state.go('main.myAccount.accountHome');
        }
    };
			
}]);