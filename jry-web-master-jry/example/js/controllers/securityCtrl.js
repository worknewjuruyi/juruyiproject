mainModule.controller('securityCtrl', function($rootScope,$scope,$filter,resourceService,$interval,$localStorage,$state,ngDialog) {
	$scope.user = {};
	$scope.bank = {};
	$scope.trade = {};
	$scope.passwd = {};
	$scope.subForm = '';
	$scope.user.getCodeText = '获取验证码';
	$scope.bank.getCodeText = '获取验证码';
	$scope.trade.getCodeText = '获取验证码';
	$scope.isSubmit = false;
	$rootScope.title = '安全认证-菠菜理财';
	$scope.hasSysBank = false;

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "安全认证数据":
				if (data.success) {
					$scope.member = data.map;
					$scope.truenameset = data.map.realFlag;
					$scope.tpwdset = data.map.tpwFlag;
					$('.trade-code-btn').text($scope.tpwdset ? '修改' : '设置');
					if ($localStorage.product == 'bindBank') {
						$('.set-bankinfo').addClass('actived-set-wrap').find('.btn a').text('取消绑定');
						$('#set-bankinfo').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'setTruename') {
						$('.set-truename').addClass('actived-set-wrap').find('.btn a').text('取消认证');
						$('#set-truename').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'setTradeCode') {
						$('.set-tradecode').addClass('actived-set-wrap').find('.btn a').text('取消设置');
						$('#set-tradecode').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'forgetTradeCode') {
						$('.set-tradecode').addClass('actived-set-wrap').find('.btn a').text('取消修改');
						$('#set-tradecode').show().find('.set-trade-box').hide();
						$('.set-before').show();
						$localStorage.product = '';
					}
				}
				break;
			// 安全认证修改登录密码
			case "安全认证修改登录密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '修改成功'
					});
					$('#set-passwd').slideUp(500, function() {
						$('.reset-passwd-btn').text('修改');
						$('.set-passwd').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
						$state.go('main.myAccount.security',null,{
						    reload:true
						});
					});
				} else {
					var errorMsg = $filter('安全认证修改登录密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;
				
			// 设置交易密码
			case "设置交易密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '交易密码设置成功'
					});
					$('#set-tradecode').slideUp(500, function() {
						$('.trade-code-btn').text('修改');
						$('.set-tradecode').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
							$scope.tpwdset = true;
						});
					});

				} else {
					var errorMsg = $filter('设置交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;

			// 修改交易密码
			case "修改交易密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '交易密码修改成功'
					});
					$('#set-tradecode').slideUp(500, function() {
						$('.trade-code-btn').text('修改');
						$('.set-tradecode').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
						$state.go('main.myAccount.security',null,{
						    reload:true
						});
					});
				} else {
					var errorMsg = $filter('修改交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;

			// 找回交易密码验证短信验证码
			case "找回交易密码验证短信验证码":
				if (data.success) {
					$('.set-before').slideUp(500, function() {
						$('.set-new').slideDown(500);
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
					});
				} else {
					$.qTip({
						'type': false,
						'text': '验证码输入不正确'
					});
					$scope.isSubmit = false;
				}
				break;

			// 找回交易密码设置新交易密码
			case "找回交易密码设置新交易密码":
				if (data.success) {
					$('.set-new').slideUp(500, function() {
						$('.change-trade-success').slideDown(500);
						setTimeout(function() {
							$('.change-trade-success').slideUp(500, function() {
								$('.trade-code-btn').text('修改');
								$('.set-tradecode').removeClass('actived-set-wrap').find('.set-mod').hide();
								$('.set-trade-box').css('display', 'block');
								$scope.$apply(function() {
									$scope.isSubmit = false;
								});
								$state.go('main.myAccount.security',null,{
								    reload:true
								});
							});
						}, 3000);
					});
				} else {
					var errorMsg = $filter('找回交易密码设置新交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;
		}
	});

	// 显示下拉内容
	var isChange = false;
	$scope.showSetMod = function(event) {
		var $this = $(event.currentTarget),
			$mySetWrap = $this.parents('.set-wrap');

		if (!$mySetWrap.hasClass('actived-set-wrap')) {
			var $activeSetWrap = $('.actived-set-wrap'),
				$activeBtn = $activeSetWrap.find('.btn a');
			if (isChange) {
				return;
			}
			isChange = true;
			$activeSetWrap.find('.set-mod').slideUp(400, function() {
				$activeSetWrap.removeClass('actived-set-wrap');
				$activeBtn.text($activeBtn.text().replace('取消', ''));
			});
			$mySetWrap.find('.set-mod').slideDown(400, function() {
				$mySetWrap.addClass('actived-set-wrap');
				$this.text('取消' + $this.text());
				isChange = false;
			});
		} else {
			if (isChange) {
				return;
			}
			isChange = true;
			$mySetWrap.find('.set-mod').slideUp(400, function() {
				$mySetWrap.removeClass('actived-set-wrap');
				$this.text($this.text().replace('取消', ''));
				isChange = false;
			});
		}
	};

	$scope.submitForm = function(isvalid, event, formname) {
		if (!isvalid || $scope.isSubmit) {
			return;
		}
		else {
			if ($filter('isRegister')().register) {
				switch(formname) {
					// 修改登录密码
					case 'passwdFrom':
						resourceService.queryPost($scope, $filter('交互接口对照表')('安全认证修改登录密码'),{
							oldPwd: $scope.passwd.usedpasswd,
							newPwd: $scope.passwd.newpasswd,
							confirmPwd: $scope.passwd.repasswd
						},'安全认证修改登录密码');
						$scope.isSubmit = true;
						break;
					// 设置交易密码
					case 'tpwdSetForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('设置交易密码'),{
							tpwd: $scope.trade.tpasswd,
							confirm: $scope.trade.retpasswd
						},'设置交易密码');
						$scope.isSubmit = true;
						break;

					// 修改交易密码
					case 'changetpwdForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('修改交易密码'),{
							oldPwd: $scope.trade.usedtpasswd,
							tpwd: $scope.trade.newtpasswd,
							confirmTpwd: $scope.trade.retradepasswd
						},'修改交易密码');
						$scope.isSubmit = true;
						break;

					// 找回交易密码验证短信验证码
					case 'phonecodeForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('找回交易密码验证短信验证码'),{code: $scope.trade.phonecode},'找回交易密码验证短信验证码');
						$scope.isSubmit = true;
						break;

					// 找回交易密码设置新交易密码
					case 'setnewtpwdForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('找回交易密码设置新交易密码'),{
							tpwd: $scope.trade.newtpwd,
							confirmTpwd: $scope.trade.retpwd,
							code: $scope.trade.phonecode
						},'找回交易密码设置新交易密码');
						$scope.isSubmit = true;
						break;
				}
			}
		}
	};
	$scope.isGetVoice = false;
	// 身份认证--获取短信验证码
	$scope.bank.times = 59;
	$scope.user.times = 59;
	$scope.trade.times = 6;
	$scope.getPhoneCode = function(bankphone, bankcardno, event, item, isvoice) {
		var $this = $(event.currentTarget),
			type = 1;
		$this.parents('.set-mod').find('.voice-box span').hide();
		if ($this.hasClass('getcode-disabled')) {
			return;
		}
		if (!$filter('isRegister')().register) {
			return;
		}

		$this.addClass('getcode-disabled');

		if (isvoice) {
			type = 2;
		} else {
			type = 1;
		}
		
		if (bankphone && bankcardno) {
			$.ajax({
				headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url: $filter('交互接口对照表')('身份认证获取短信验证码'),
				type: 'post',
				data: JSON.stringify({mobilePhone: bankphone,bankNum: $filter('limitTo')(bankcardno, -4),type: type}),
				dataType: 'json',
				success: function(data){
					if (data.success) {
						if (isvoice) {
							item.isGetVoice = true;
						} else {
							item.isGetVoice = false;
						}

						// item.times = 59;
						// item.isGetCode = true;
						if (!isvoice || (isvoice && !item.isGetCode)) {
							if (!isvoice) {
								item.isGetCode = true;
							}
							item.timer = $interval(function(){
								if (item.times == 0) {
									$interval.cancel(item.timer);
									// if (!isvoice) {
										item.getCodeText = '获取验证码';
									// } else {
										item.isGetVoice = false;
									// }
									item.isGetCode = false;
									item.times = 59;
									return;
								}
								// if (!isvoice) {
									item.getCodeText = item.times + 's重新获取';
								// }
								item.times --;
					        }, 1000);
						}
						$.qTip({
							'type': true,
							'text': '短信发送成功'
						});
					} else {
						var errorMsg = $filter('身份认证获取验证码error信息')(data.errorCode);
						if (data.errorCode == '8888') {
							$this.parents('.set-mod').find('.voice-box span').show();
						} else {
							$.qTip({
								'type': false,
								'text': errorMsg
							});
						}
						$this.removeClass('getcode-disabled');
					}
					// $scope.isSubmit = false;
				}
			});
		} else {
			item.isGetVoice = true;
			$.ajax({
				headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url: $filter('交互接口对照表')('找回交易密码获取短信验证码'),
				type: 'post',
				data: JSON.stringify({type: type}),
				dataType: 'json',
				success: function(data){
					if (data.success) {
						// console.log('a')
						// if (isvoice) {
						// 	item.isGetVoice = true;
						// } else {
						// 	$scope.trade.isGetVoice = false;
						// 	$scope.$apply();
						// }
						// console.log($scope.trade)
						// item.times = 59;
						// item.isGetCode = true;
						if (!isvoice || (isvoice && !item.isGetCode)) {
							if (!isvoice) {
								item.isGetCode = true;
							}
							item.timer = $interval(function(){
								if (item.times == 0) {
									$interval.cancel(item.timer);
									// if (!isvoice) {
										item.getCodeText = '获取验证码';
									// } else {
										item.isGetVoice = false;
									// }
									item.isGetCode = false;
									item.times = 59;
									return;
								}
								// if (!isvoice) {
									item.getCodeText = item.times + 's重新获取';
								// }
								item.times --;
					        }, 1000);
						}
						$.qTip({
							'type': true,
							'text': '短信发送成功'
						});
					} else {
						var errorMsg = $filter('找回交易密码获取短信验证码error信息')(data.errorCode);
						if (data.errorCode == '8888') {
							$this.parents('.set-mod').find('.voice-box span').show();
						} else {
							$.qTip({
								'type': false,
								'text': errorMsg
							});
						}
						$this.removeClass('getcode-disabled');
					}
				}
			});
		}
	};

	// 忘记交易密码
	$scope.getCodeByMsg = function(event) {
		var $this = $(event.currentTarget);
		$this.parents('.set-trade-box').slideUp(500, function() {
			$('.set-before').slideDown(500);
		});
	};

	resourceService.queryPost($scope, $filter('交互接口对照表')('安全认证数据'),{},'安全认证数据');
})