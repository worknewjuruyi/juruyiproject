mainModule.controller('withdrawCtrl', function($rootScope,$scope,$filter,resourceService,ngDialog,$localStorage,$location,$state) {
	$localStorage.dialogType = '提现';
	$rootScope.title = '提现-菠菜理财';
	$rootScope.activeNav = 'account';
	var $storageForm = $('#storageForm');
	$scope.isSubmit = false;
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "提现数据":
				if (data.success) {
					if (!data.map.isFuiou) {
						$state.go('main.myAccount.openStorage');
						return;
					}
					$scope.user = data.map;
					if (data.map.isChargeFlag) {
						$scope.user.cost = 2;
					} else {
						$scope.user.cost = 0;
					}
				} else {
					var errorMsg = $filter('提现数据error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
				}
			break;
			case "存管提现":
				if (data.success) {
					if ($localStorage.hasCGWithdraw!=undefined) {
						delete $localStorage.hasCGWithdraw;
					}
					$scope.storage = data.map;

					$filter('提现跳转弹窗')($scope);

					getStorageForm($scope.storage.signature);
					// $('#storageJson').val($scope.storage.signature);
					$('#storageForm')[0].action = $scope.storage.fuiouUrl;
    				$('#storageForm')[0].submit();
				} else {
    				$scope.isSubmit = false;
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
				}
			break;
		}
	});

	// onblur将金额保留两位小数
	$scope.setAmount = function(event,type) {
		if (type==1) {
			$scope.user.cash=$filter('isNumber2')($scope.user.cash,undefined,1);
		} else if (type==2) {
			$scope.user.storagecash=$filter('isNumber2')($scope.user.storagecash,undefined,1);
		}
	};

	// 未绑定银行卡时--去安全认证页面绑定
	$scope.bindBank = function() {
		// $scope.$broadcast('myEvent.WHDR_Ctrl','账户管理');
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.security','bindBank',null,{name:'账户管理',url:'main.myAccount.security'});
	};

	// 未设置交易密码时--去安全认证页面设置
	$scope.setTradeCode = function() {
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.security','setTradeCode',null,{name:'账户管理',url:'main.myAccount.security'});
	};

	// 忘记交易密码--去安全认证页面找回
	$scope.forgetTradeCode = function() {
		// $rootScope.$emit('myEvent.WHDR_Ctrl','账户管理');
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.security','forgetTradeCode',null,{name:'账户管理',url:'main.myAccount.security'});
	};

	// 提交表单
	$scope.submitForm = function(valid) {
		if (!valid || $scope.isSubmit) {
			return;
		}
		$scope.isSubmit = true;
		resourceService.queryPost($scope, $filter('交互接口对照表')('存管提现'),{
			amount: $scope.user.storagecash,
			isChargeFlag: $scope.user.isChargeFlag
		},'存管提现');
	};

	resourceService.queryPost($scope, $filter('交互接口对照表')('提现数据'),{},'提现数据');
	
	// 存管提现成功或失败弹窗
	if ($location.$$search.success != undefined && $localStorage.hasCGWithdraw==undefined) {
		$localStorage.hasShowRedBagDialog = true;
		$localStorage.hasCGWithdraw = true;
		if ($location.$$search.success == 'true') {
			$localStorage.dialogStatus = 'success';
			$scope.rechargeSuccess = true;
			$localStorage.dialogMsg = '您已成功提现'+ $filter('currency')($location.$$search.amount,'') +'元';
		} else if ($location.$$search.success == 'false') {
			$localStorage.dialogStatus = 'error';
			$localStorage.dialogMsg = $location.$$search.errorMsg;
		}
		$filter('充值提现弹窗')($scope);
	}

	function getStorageForm(json) {
		json = JSON.parse(json);
		for(var key in json.message){
			if(key !="signature") {
				$storageForm.prepend('<input type="hidden" name="'+key+'" value="'+json.message[key]+'" /><br/>');
			}
		}
		$storageForm.prepend('<input type="hidden" name="signature" value="'+json.signature+'" /><br/>');
	}

	$scope.reload = function() {
		window.location.reload();
	};

	$scope.closeDialog = function() {
        ngDialog.closeAll();
    };
});