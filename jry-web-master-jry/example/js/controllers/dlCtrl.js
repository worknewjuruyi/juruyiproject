//login.html
/*登录*/
//注入的communicationService暂无**
mainModule.controller('dlCtrl', [ '$scope', '$rootScope', '$http', '$state', '$stateParams', '$localStorage','$location', 'resourceService','communicationService','$filter','ngDialog',function($scope, $rootScope, $http, $state, $stateParams, $localStorage,$location,resourceService,communicationService,$filter,ngDialog) {
	$scope.userLogin = {};
	$rootScope.title="菠菜理财-用户登录";
	var obj = $location.$$search;
	$scope.goZhuce = function() {//跳转到注册
        $state.go('register',obj);
    };
    //初始化页面
    document.getElementsByTagName('html')[0].scrollTop = 0;
    document.getElementsByTagName('body')[0].scrollTop = 0;
	var isDenLuSubmin = true;//防止重复提交标记
	var changePicEvent;
	var changeIMG = function (event) {//换图片验证码
		if(event != undefined){
			event.currentTarget.src += '?'+ new Date().getTime();
		}else{
			if($('.img-box img')[0]!= undefined){
				$('.img-box img')[0].src += '?'+ new Date().getTime();	
			};
		};
	};
	changeIMG();
	$rootScope.showMaskCoupon = false;

	// 判断是不是从活动页进来-----促复投第一期 //*暂无*
	if ($location.$$search.fromActivity == undefined) {
		$scope.showRedDialog = true;
	} else {
		$('html,body').animate({scrollTop:0});
		$scope.showRedDialog = false;
	}

	$scope.gotoLoginPage = function (type) {
		switch(type){
			case "帮助中心"://我的资产
				$localStorage.showQA = false;
				$filter('跳转页面')('','main.home','main.jt2.help','帮助中心',null,{name:'帮助中心',url:'main.jt2.help'});
			break;
			case "理财课堂"://我的资产
				$filter('跳转页面')('','main.home','main.jt.LCZS','帮助中心',null,{name:'帮助中心',url:'main.jt.LCZS'});
			break;
			case "新手指引"://我的资产
				$filter('跳转页面')('','main.home','main.guide','帮助中心',null,{name:'',url:'main.guide'});
			break;

			case "信息披露"://我的资产
				$filter('跳转页面')('','main.home','main.jt.JSGK','信息披露',null,{name:'信息披露',url:'main.jt.JSGK'});
			break;
			case "菠菜概况"://我的资产
				$filter('跳转页面')('','main.home','main.jt.JSGK','信息披露',null,{name:'信息披露',url:'main.jt.JSGK'});
			break;
			case "法律法规"://我的资产
				$filter('跳转页面')('','main.home','main.jt.FLFG','信息披露',null,{name:'信息披露',url:'main.jt.FLFG'});
			break;
			case "联系我们"://我的资产
				$filter('跳转页面')('','main.home','main.jt.LXWM','LXWM',null,{name:'信息披露',url:'main.jt.LXWM'});
			break;

			default:
				$filter("跳转页面")(type,'main.home','dl');
			break;
		};
	};
	$scope.LoginClick = function(clickName,tegForm) {
		switch(clickName){
			case 'denLu': 
				if(isDenLuSubmin){//防重复提交
					// changeIMG(changePicEvent);
					isDenLuSubmin = false;
					resourceService.queryPost($scope,$filter('交互接口对照表')('登录接口'),$scope.userLogin,{name:'用户登录',tegForm:tegForm});
					
				};
			break;
		};
	};
	$scope.clickInput=function (type,event,isLogin,tegForm) {
		switch(type){
			case 'changePic': $scope.userLogin.picCode=null; changePicEvent = event; changeIMG(changePicEvent);	break;
		};
	};
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
//		console.log(type);
//		console.log(data);		
		switch(type.name){
			case '用户登录': 
				isDenLuSubmin 
				= true;
				if(data.success){
				    //登录图形验证码标记（是否显示）
					$scope.isPicYanZhen = false;
					$localStorage.user = {};
					$localStorage.loginNum=0;
					if ($scope.specialDialogTag == true) {//此处的specialDialogTag未定义
						$scope.specialDialogTag = false;
						$scope.$emit('loginSuccess',true);
					} else {
						if ($location.$$search.goMyFriend != undefined) {
							$state.go('main.myAccount.myFriend');
						} else if ($localStorage.regACTURL != undefined) {
							$state.go($localStorage.regACTURL);
							ngDialog.closeAll();
							delete $localStorage.regACTURL;
							$scope.$emit('loginSuccess',true);
						} else if ($localStorage.pathUrl != undefined && $localStorage.pathUrl == 'main.home' && $scope.showRedDialog) {
							delete $localStorage.pathUrl;
							$state.go('main.myAccount.accountHome');
						} else {
							if ($location.$$search.fromActivity != undefined && $localStorage.activityUrl != undefined) {
								if ($location.$$search.gotomyFriend!=undefined) {
									$state.go('main.myAccount.myFriend');
								} else {
									$state.go($localStorage.activityUrl);
								}
								delete $localStorage.activityUrl;
								$scope.$emit('loginSuccess',true);
							} else {
								$filter('跳回上一页')();
							}
						}
					}
					if (data.flag) {
						$rootScope.showMaskCoupon = true;
						$('.mask-coupon').css('display','block');
					} else {
						$rootScope.showMaskCoupon = false;
					}

				}else{
					$scope.serverErrorCode = data.errorCode;
//					console.log($scope.serverErrorCode)
					$localStorage.loginNum++;
					if(data.errorCode == 1002 ){
						type.tegForm.picCode.$error.serverError = true;
					}else{
						type.tegForm.userName.$error.serverError = true;
					};
					//判断何时显示登录图形验证码
					if($localStorage.loginNum > 2 || data.errorCode == 1002 || data.map.loginErrorNums > 2){
						$scope.isPicYanZhen = true;
					};
				}
			break;
			//--------------促复投第一期-------------
			// case '获取复投红包':
			// 	if (data.success) {
			// 		$rootScope.promoteGetCashFrom = false;
			// 		if (data.map.isRedPacket) {
			// 			if (data.map.returnedCount) {
			// 				$rootScope.promoteHasReturn = true;
			// 				$rootScope.returnedCount = data.map.returnedCount;
			// 			} else {
			// 				$rootScope.promoteHasReturn = false;
			// 			}
			// 		}
			// 		$rootScope.promoteRedbags = data.map.redPacketList;
			// 		if ($rootScope.promoteRedbags.length > 2) {
			// 			$rootScope.promoteRedbags.length = 2;
			// 		}
			// 		$filter('红包弹窗')($rootScope);
			// 	}
			// break;
		};
	});
}])