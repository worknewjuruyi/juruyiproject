
/* si 充值 */
mainModule.controller('rechargeCtrl', ['$rootScope','$scope','$filter','resourceService','ngDialog','$localStorage','$interval','$http','$state','$location',function($rootScope,$scope,$filter,resourceService,ngDialog,$localStorage,$interval,$http,$state,$location) {
	$scope.user = {};
	$scope.code = {};
	$scope.code.isGetCode = false;
	$scope.code.getCodeText = '点击获取验证码';
	$localStorage.dialogType = '充值';
	$rootScope.title = '充值-菠菜理财';
	$scope.tab = 1;
	$scope.online = {};
	$hiddenForm = $('#hiddenForm')[0];

	var $kjForm = $('#kjForm')[0],
		$wyForm = $('#wyForm')[0],
		isSubmit = false;

	$rootScope.activeNav = 'account';

	$scope.rechargemore = 3;
	$scope.quota = 500000;

	$scope.amountError = false;

	// 选择快捷网银
	$scope.chooseKJ = true;
	$scope.showChangeQA = function() {
		$localStorage.showCGQA = 'recharge';
	};
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type,item) {
		switch(type) {
			case "充值数据":
				if (data.success) {
					if (!data.map.isFuiou) {
						$state.go('main.myAccount.openStorage');
						return;
					}
					$scope.user = data.map;
					if ($scope.user.quota!=undefined && $scope.user.quota!='') {
						$scope.quota = $scope.user.quota;
					}
					if ($scope.user.bankList!=undefined) {
						$scope.bankCode = $scope.user.bankList[0].bankCode;
					}
				} else {
					var errorMsg = $filter('充值数据error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
				}
			break;
			case "存管充值直连":
				if (data.success) {
					if ($localStorage.balanceNotEnough == true) {
						$localStorage.balanceNotEnough = false;
						$state.go($localStorage.pathUrl,{id:$localStorage.balanceNotEnoughId});
						return;
					} else {
						$localStorage.dialogStatus = 'success';
						$scope.rechargeSuccess = true;
						$localStorage.dialogMsg = '您已成功充值'+ $filter('currency')($scope.user.amount,'') +'元';
					}
				} else {
					$scope.recharge = {};
					$scope.recharge.errorCode = data.errorCode;
					$scope.errorCode = data.errorCode;
					// isSubmit = false;
					$localStorage.dialogStatus = 'error';
					$localStorage.dialogMsg = data.errorMsg;
				}
				$filter('充值提现弹窗')($scope);
			break;
			case "存管网银充值":
				if (data.success) {
					// if ($localStorage.hasCGRecharge!=undefined) {
					// 	delete $localStorage.hasCGRecharge;
					// }
					$filter('充值弹窗')($scope);
					$scope.wystorage = data.map;
					getStorageForm($scope.wystorage.signature,'wyForm');
					$wyForm.action = $scope.wystorage.fuiouUrl;
    				$wyForm.submit();
				} else {
					isSubmit = false;
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
				}
			break;
			case "充值验证码直连":
				if (data.success) {
					$scope.quickOrder = data.map.order;
					if (!$scope.code.isGetCode) {
						$scope.code.isGetCode = true;
						$scope.code.timer = $interval(function(){
							if ($scope.code.times == 0) {
								$interval.cancel($scope.code.timer);
								$scope.code.getCodeText = '点击获取验证码';
								$scope.isGetVoice = false;
								$scope.code.isGetCode = false;
								$scope.code.times = 59;
								return;
							}
							$scope.code.getCodeText = $scope.code.times + 's重新获取';
							$scope.code.times --;
				        }, 1000);
					}
					$.qTip({
						'type': true,
						'text': '短信发送成功'
					});
				} else {
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
					$('a.getphonecode').removeClass('getcode-disabled');
				}
			break;
		}
	});
	$('.amount').on('keyup change', function() {
		$scope.$apply(function() {
			if ($scope.user.amount == '' || $scope.user.amount == undefined) {
				$scope.amountIsTrue = true;
			}
			var nowquota;
			if ($scope.tab==1) {
				nowquota = $scope.quota;
			} else if ($scope.tab==2) {
				nowquota = '';
			}
			var obj = $filter('rechargeLimit')($scope.user.amount,$scope.rechargemore,nowquota);
			// obj.typemax = true;
			if (obj.typemin == false || obj.typemax == false) {
				$scope.amountIsTrue = false;
				if (obj.typemin == false) {
					$scope.typemin = false;
					$scope.amountMsg = '充值金额至少为' + $scope.rechargemore + '元';
				}
				if (obj.typemax == false) {
					$scope.typemax = false;
					$scope.amountMsg = '单笔限额' + $filter('number')($scope.quota) + '元';
				}
			} else {
				$scope.amountIsTrue = true;
				$scope.typemin = true;
				$scope.typemax = true;
				$scope.amountMsg = '';
			}
		});
	});

	// onblur将金额保留两位小数
	$scope.setAmount = function() {
		$scope.user.amount = $filter('isNumber2')($scope.user.amount,undefined,1);
	};

	// $scope.setAmountError = function() {
	// 	$scope.amountError = false;
	// };

	// 切换方式
	$scope.changeTab = function(type) {
		var myquota;
		switch(type) {
			case 1:
				$scope.tab = 1;
				myquota = $scope.quota;
			break;
			case 2:
				$scope.tab = 2;
				myquota = '';
			break;	
		}
		var obj = $filter('rechargeLimit')($scope.user.amount,$scope.rechargemore,myquota);
		if (obj.typemin == false || obj.typemax == false) {
			$scope.amountIsTrue = false;
			if (obj.typemin == false) {
				$scope.typemin = false;
				$scope.amountMsg = '充值金额至少为' + $scope.rechargemore + '元';
			}
			if (obj.typemax == false) {
				$scope.typemax = false;
				$scope.amountMsg = '单笔限额' + $filter('number')($scope.quota) + '元';
			}
		} else {
			$scope.amountIsTrue = true;
			$scope.typemin = true;
			$scope.typemax = true;
			$scope.amountMsg = '';
		}

	}

	resourceService.queryPost($scope, $filter('交互接口对照表')('充值数据'),{},'充值数据');

	// 身份认证--获取短信验证码
	$scope.code.times = 59;
	$scope.getPhoneCode = function(entrance, event, item, myentrance) {
		if (!entrance) {
			return;
		}
		if (myentrance!=undefined && !myentrance) {
			return;
		}
		if (!$filter('isRegister')().register) {
			return;
		}
		var $this = $(event.currentTarget);
		if ($this.hasClass('getcode-disabled')) {
			return;
		}
		$this.addClass('getcode-disabled');
		$scope.amountError = false;

		resourceService.queryPost($scope, $filter('交互接口对照表')('充值验证码直连'),{
			amt:$scope.user.amount,
			bank_mobile:$scope.user.bankMobilePhoneFuiou==''?$scope.user.bankPhoneFuiou:$scope.user.bankMobilePhoneFuiou
		},'充值验证码直连',item);

	};

	// 提交表单
	$scope.submitForm = function(valid) {
		if (!valid || isSubmit) {
			return;
		}
		isSubmit = true;
		resourceService.queryPost($scope, $filter('交互接口对照表')('存管充值直连'),{
			bank_mobile:$scope.user.bankMobilePhoneFuiou,
			yzm:$scope.user.phonecode,
			amt:$scope.user.amount,
			order:$scope.quickOrder
		},'存管充值直连');
	};

	// 选择银行
	$scope.chooseBank = function(code) {
		$scope.bankCode = code;
		// if (isSubmit) {
		// 	return;
		// }
		// isSubmit = true;
		// resourceService.queryPost($scope, $filter('交互接口对照表')('存管网银充值'),{
		// 	amt: $scope.user.amount,
		// 	iss_ins_cd: $scope.bankCode,
		// 	order_pay_type: 'B2C'
		// },'存管网银充值');
	}

	// 网银充值
	$scope.goWYPay = function() {

		if ($scope.isSubmit) {
			return;
		}
		$scope.isSubmit = true;
		resourceService.queryPost($scope, $filter('交互接口对照表')('存管网银充值'),{
			amt: $scope.user.amount,
			iss_ins_cd: $scope.bankCode,
			order_pay_type: 'B2C'
		},'存管网银充值');
	};

	function getStorageForm(json,form) {
		json = JSON.parse(json);
		for(var key in json.message){
			if(key !="signature") {
				$('#'+form).prepend('<input type="hidden" name="'+key+'" value="'+json.message[key]+'" /><br/>');
			}
		}
		$('#'+form).prepend('<input type="hidden" name="signature" value="'+json.signature+'" /><br/>');
	}

}]);