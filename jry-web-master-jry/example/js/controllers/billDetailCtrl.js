//bill-detail.html
mainModule.controller('billDetailCtrl', ['$rootScope','$scope', '$state', '$localStorage', 'resourceService','$filter','communicationService','$timeout','$location','ngDialog','$element','MAIN_MENU','storage','$stateParams',function($rootScope,$scope, $state, $localStorage,resourceService,$filter,communicationService,$timeout,$location,ngDialog,$element,MAINMENU,storage,$stateParams) {
	$filter('isLogin')($scope);//portFilters.js中路由状态判断
	$(window).scrollTop(0);
	MAINMENU.menuname('bill','menu');//resourceService.js中的factory用于*缓存要跳转到页面名*
	//初始化设置
	$scope.product = $localStorage.product;
	$scope.path = $localStorage.pathObj;
	$scope.title = '项目详情';
	$scope.portName = '投资记录';
	$scope.playSound=true;
	$scope.amount = 0;
	$scope.showTabNum = 0;
	$scope.isShowIntroduce=true;
	$scope.isShowProInfo=false;
	$scope.isShowGuarantee=false;
	$scope.isShowInvest=false;
	$scope.isShowShouyi=false;
	$scope.isFinish = false;

	$scope.goldACT = false;

	$scope.hasGold = false;

	$scope.sureNoGold = false;

	$scope.bill= {};
    $scope.bill.pageOn = 1;
    $scope.bill.pageSize = 5;
    delete $localStorage.inProfitProductList;
    $scope.redbag = false;
    
    $scope.isLogin = $filter('isRegister')().register;//判断用户是否登录返回true/false

	// 未设置交易密码时--去安全认证页面设置
	$scope.setTradeCode = function() {
		ngDialog.closeAll();
		//'跳转页面'在portFilters.js
		$filter('跳转页面')('','main.myAccount.recharge','main.myAccount.security','setTradeCode',null,{name:'账户管理',url:'main.myAccount.security'});
	};
    $scope.isNumCash=false;
	var isSubmin=true;
	var balance;
	$scope.selectMyWinning=function(){
		$state.go('main.myAccount.winningRecord');//跳转到中奖中心
		ngDialog.closeAll();
	}
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		console.log(type);
		console.log(data);
		switch(type){
			case '投资记录':
				if (data.success) {
					$scope.investList = data.map.page.rows;
					$scope.allUserNum = data.map.page.rows.length;
					$scope.bill = data.map.page;
					$scope.bill.pages = [];
					for(var i=0;i<parseInt($scope.bill.totalPage);i++){
						$scope.bill.pages[i]=i+1;
					};
				}
			break;
			case '用户信息':
				if (data.success) {
					$localStorage.user = data.map;
				}
			break;
			case '新手标体验金':
				if (data.success) {
					$scope.tyjCoupons = data.map.list;
					if($scope.tyjCoupons.length>0){
						$scope.TYJ={};
						$scope.TYJ=$scope.tyjCoupons[0];
						var maxNum = Math.max.apply(Math,[$scope.tyjCoupons[0].amount,$scope.tyjCoupons[1].amount,$scope.tyjCoupons[2].amount]);
						for (var i = 0; i < $scope.tyjCoupons.length; i++) {
							if(maxNum == $scope.tyjCoupons[i].amount){
								$scope.tyjCoupons[i].tyjCouponBool = true;
								if($scope.tyjCoupons[i]){
									//首投
								}
							}else{
								$scope.tyjCoupons[i].tyjCouponBool =false;
							}
						};
						$scope.product.nowNum=$scope.tyjCoupons[0].enableAmount;
					}
				}
			break;
			case "票据详情":
				$scope.XQ = data.map;
				$localStorage.product = $scope.product = data.map.info;
				$scope.extendInfos = data.map.extendInfos;
				$scope.isOldUser = data.map.isOldUser;
				$scope.drMemberFavourableList = data.map.drMemberFavourableList;
				$scope.isShowLabel = data.map.isShowLabel;
				// 存管
				$scope.isFuiou = data.map.isFuiou;	
				if ($scope.drMemberFavourableList != undefined) {
					var drlength = $scope.drMemberFavourableList.length;
					for (var k=0;k<drlength;k++) {
						if ($scope.drMemberFavourableList[k].source == 100) {
							if ($scope.product.type == 1) {
								$scope.hasGold = true;
							}
						}
					}
				}

				if (data.map.projectList != undefined ) {
					if(data.map.projectList.length != 0){
						$scope.projectList = data.map.projectList;
						$scope.projectListData = true;
					}
				} else {
					$scope.projectListData = false;
				}
				$scope.goPage($scope);
				$scope.pics = data.map.picList;

				if(data.map.funds != undefined){
					$scope.account={};
					$scope.account = data.map.funds;//用户资金
					$scope.account.balance = $scope.account.fuiou_balance;
					balance = $scope.account.balance;
				}else{
					delete $localStorage.user;
				}
				if($scope.product.type == 3 && $scope.XQ.isNewUser == true && $scope.XQ.fuiouNewHandInvested==false){
					$scope.isNewGay = true;
				}else{
					$scope.isNewGay = false;
				}
				var borrower = $filter('截取段落')($scope.product.borrower);
				var introduce = $filter('截取段落')($scope.product.introduce);
				var repaySource = $filter('截取段落')($scope.product.repaySource);
				var windMeasure = $filter('截取段落')($scope.product.windMeasure);
				$scope.product.borrower = borrower;
				$scope.product.introduce = introduce;
				$scope.product.repaySource = repaySource;
				$scope.product.windMeasure = windMeasure;
				
				if($scope.product.establish != undefined){
					var date3 = $scope.product.establish - Date.parse(new Date());
					var day = Math.floor(date3/(24*3600*1000));
					var hh= Math.floor(date3/(3600*1000));
					if(day > 0){
						$scope.nowTimer = day+'天';
						// $scope.isFinish = true;
					}else
					if(day == 0&& hh > 1){
						$scope.nowTimer = hh+'小时';
						// $scope.isFinish = true;
						$scope.isBuTimer = true;
					}else
					if(day == 0&& hh < 1){
						$scope.nowTimer = '1小时内'
						// $scope.isFinish = true;
					}else
					if(hh < 0){
						$scope.nowTimer ='已结束';
						$scope.isFinish = true;
					}
				}else{
					$scope.nowTimer ='已结束';
					$scope.isFinish = true;
				};
				if(storage.storageData){
					$scope.isShowIntroduce=false;
					$scope.isShowProInfo=false;
					$scope.isShowGuarantee=false;
					$scope.isShowInvest=false;
					storage.storageData=false;
					$timeout(function(){
						$("html,body").animate({scrollTop:$('.bill-detail-info').offset().top})
					});
			    }
				if (data.map.realverify != undefined) {
					$scope.realverify = data.map.realverify;
				}
			break;
			case "确认投资":
				isSubmin = true;
				$scope.isShowOver=false;
				$scope.success = data.success;
				$scope.nextInvestNumber = $scope.product.nowNum;
				$scope.product.tpwd=null;
				$scope.redbag = false;
				if(data.success){
					if (data.flag) {
						$scope.redbag = true;
					} else {
						$scope.redbag = false;
					}

					$scope.pText = '恭喜您！投资成功！';
					$scope.statusCode = 'success';
					resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),{id: $scope.product.id},'票据详情');
					$scope.investTime = data.map.investTime;
				}else{
					if (data.errorCode == '2001') {
						$scope.showForgetPwd = true;
					} else {
						$scope.showForgetPwd = false;
					}
					if ($filter('确认投资服务器Error')(data.errorCode) == undefined) {
						$scope.statusCode = 'error';
						$scope.pText = data.errorMsg;
					} else {
						$scope.statusCode = $filter('确认投资服务器Error')(data.errorCode).classCode;
						$scope.pText = $filter('确认投资服务器Error')(data.errorCode).text;
					}
					$scope.redbag = false;
				}
			break;
			case "用户可用优惠券":
				$scope.hb=null;
				if(data.success){
					$scope.HBList=[];
					$scope.QList=[];
					$scope.FBQList=[];
					$scope.fristInvest=data.map;

					$scope.clickBox = true;
					for (var i = 0; i < data.map.list.length; i++) {

						switch(data.map.list[i].type){
							case 1:
								data.map.list[i].sel=false;
								$scope.HBList.push(data.map.list[i]);

								// 复投红包
								if (Qtrget == null && $stateParams.redBagFid != undefined && $stateParams.redBagFid == data.map.list[i].id) {
									Qtrget = data.map.list[i];
									$scope.hb = data.map.list[i];
								}
							break;
							case 2:
								data.map.list[i].sel=false;
								$scope.QList.push(data.map.list[i]);
							break;
							case 4:
								data.map.list[i].sel=false;
								if(data.map.list[i].source==0){
									$scope.FBQList.unshift(data.map.list[i]);
								}else{
									$scope.FBQList.push(data.map.list[i])
								}
							break;
						};
					}

					// 砸金蛋的加息券
					if (Qtrget != null) {
						if (Qtrget.type == 1) {
							$scope.clickBox=0;
						} else if (Qtrget.type == 2) {
							$scope.clickBox=1;
						}
						Qtrget.sel = true;
					} else if($scope.HBList.length>0){
						$scope.clickBox=0;
					}else if($scope.QList.length>0){
						$scope.clickBox=1;
					}else if($scope.FBQList.length>0){
						$scope.clickBox=2;
					}else{
						$scope.clickBox=999;
					}
					$scope.isShowOver = true;
				}else{
				}
			break;
		}
	})

	$scope.selTYJ=false;
    $scope.onSelTyj = function (item) {
    	// 选体验金
    	for (var i = 0; i < $scope.tyjCoupons.length; i++) {
    		$scope.tyjCoupons[i].tyjCouponBool=false;
    	}
    	item.tyjCouponBool=true;
    	if($scope.product.nowNum<item.enableAmount){
    		$scope.product.nowNum=item.enableAmount;
    	}
    	$scope.TYJ=item;
    	if(item.enableAmount < $scope.product.nowNum){
    		$scope.selTYJ = true;
    	}
    };
    $scope.closeDialog = function(bool) {
		ngDialog.closeAll();
	};
	var $win = $(window);
	$win.on('load resize scroll', function() {
    	$('.mask-imgs').height($win.height()).width($win.width());
        $('.mask-imgs li').height($win.height()).width($win.width());
        $('.mask-imgs li img').css('max-height',$win.height()).css('max-width',$win.width());
    });

    $('.explain').on('mouseover', function() {
    	$(this).addClass('showexplain');
    }).on('mouseout', function() {
    	$(this).removeClass('showexplain');
    });

	//controller里对应的处理函数
	$scope.renderFinish = function(){
    	if ($('.img-detail .imgs li').length <= 3) {
    		$('.img-detail .imgs ul').addClass('center-img');
    		$('.bill-turn-right').addClass('displaybtn');
    	}
		$('.bill-turn-left').addClass('displaybtn');
    	var lastindex = $('.img-detail .imgs li').length - 3;
		var mySwiper = new Swiper('.swiper-container', {
	        slidesPerView: 3,
	        paginationClickable: true,
	        loop: false
	    });

		$('.bill-turn-left').on('click', function(e){
			if ($('.bill-turn-left').hasClass('displaybtn')) {
				return;
			}
			e.preventDefault();
			mySwiper.slidePrev();
			$('.bill-turn-right').removeClass('displaybtn');
			if(mySwiper.slides[0].isActive()) {
				$('.bill-turn-left').addClass('displaybtn');
			} else {
				$('.bill-turn-left').removeClass('displaybtn');
			}
		});
		$('.bill-turn-right').on('click', function(e){
			if ($('.bill-turn-right').hasClass('displaybtn')) {
				return;
			}
			e.preventDefault();
			mySwiper.slideNext();
			$('.bill-turn-left').removeClass('displaybtn');
			// if(mySwiper.slides[lastindex].isActive()) {
			if(mySwiper.activeIndex == lastindex) {
				$('.bill-turn-right').addClass('displaybtn');
			} else {
				$('.bill-turn-right').removeClass('displaybtn');
			}
		});

		var mySwiper1 = new Swiper('.swiper-container1', {
			slidesPerView: 1,
	        paginationClickable: true
	    });

	    $('.img-detail .imgs li').on('click', function() {
	    	var index = $(this).index();
	    	if(!mySwiper1.browser.ie8) {
	    		mySwiper1.slideTo(index, 1000, false);
	    	}
	    	// mySwiper1.swipeTo(index, 1000, false);
	    	$('.mask-imgs').eq(0).addClass('show-mask');
	    });
	};
    $('.mask-imgs .close').on('click', function() {
    	$(this).parents('.mask-imgs').removeClass('show-mask');
    });
	var mySwiper2 = new Swiper('.swiper-container2', {
		slidesPerView: 1,
        paginationClickable: true
    });
	// 忘记交易密码--去安全认证页面找回
	$scope.forgetTradeCode = function() {
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.security','forgetTradeCode',null,{name:'账户管理',url:'main.myAccount.security'});
	};
	
	$localStorage.balanceNotEnough = false;
	$localStorage.balanceNotEnoughId = '';
	/*倒计时结束*/
	/*加减金额*/
	$scope.winterest = 0;
	var Qtrget=null;
	$scope.isShowShouyiDisabled=true;
	
	$scope.onClick=function (type,event,num) {
		switch(type){
			case "keyUpBalance":
					$scope.product.nowNum = parseInt($scope.product.nowNum);
					$scope.isNumCash=false;
					if ($scope.product.nowNum < 5000 || angular.equals($scope.product.nowNum,NaN)) {
						$scope.goldACT = false;
					} else {
						$scope.goldACT = true;
					}
					if(angular.equals($scope.product.nowNum,NaN)){
						$scope.isHideNowNum = true;
						$scope.account.balance = balance;
					}else{
						$scope.isHideNowNum = false;
					}
					if($scope.product.nowNum > $scope.product.maxAmount){
						$scope.product.nowNum = $scope.product.maxAmount;
					}
					if(($scope.product.nowNum - $scope.product.leastaAmount)%$scope.product.increasAmount != 0 ){
						$scope.product.nowNum -= ($scope.product.nowNum - $scope.product.leastaAmount)%$scope.product.increasAmount;
					}
			break;
			case "产品描述":
				change(event);
				$scope.isShowHDXQ=false;
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=true;
				$scope.isShowGuarantee=false;
				$scope.isShowInvest=false;
				$scope.isShowWinning=false;
			break;
			case "项目介绍":
				change(event);
				$scope.isShowHDXQ=false;
				$scope.isShowIntroduce=true;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=false;
				$scope.isShowInvest=false;
				$scope.isShowWinning=false;
			break;
			case "本息保障":
				change(event);
				$scope.isShowHDXQ=false;
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=true;
				$scope.isShowInvest=false;
				$scope.isShowWinning=false;
				$('.guarantee img').on('click', function() {
			    	var index = $(this).parents('td').index();
			    	if(!mySwiper2.browser.ie8) {
				    	mySwiper2.slideTo(index, 1000, false);
				    }
			    	$('.mask-imgs').eq(1).addClass('show-mask');
			    });
			break;
			case "投资记录":
				change(event);
				$scope.isShowHDXQ=false;
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=false;
				$scope.isShowWinning=false;
				$scope.isShowInvest=true;
				
			break;
			case "立即投资":
				$localStorage.balanceNotEnough = false;
				if (($scope.account.balance < $scope.product.leastaAmount)||($scope.account.balance - $scope.product.nowNum < 0)) {
					$localStorage.balanceNotEnough = true;
					$localStorage.balanceNotEnoughId = $location.$$search.id;
					$filter('投资余额不足弹窗')($scope);
				} else {
					if ($scope.product.nowNum >= 2000) {
						$scope.goldACT = true;
					}
					if ($scope.hasGold && !$scope.goldACT && !$scope.sureNoGold) {
						$filter('不要体验金弹窗')($scope);
					} else {
						$scope.sureNoGold = false;
						Qtrget=null;
						$scope.isShowOver = true;

						resourceService.queryPost($scope,$filter('交互接口对照表')('用户可用优惠券'),{
							pid : $scope.product.id,
							amount:$scope.product.nowNum
						},'用户可用优惠券');

						$filter('投资确认弹窗')($scope);
					}
				}
				
			break;
			case "登录":
				$filter("跳转页面")('denLu','main.billDetail','login');
			break;
			case "确认投资":
				if(isSubmin){
					isSubmin=false;
					var obj = {};
					obj.pid = $scope.product.id;
					obj.tpwd = $scope.product.tpwd;
					obj.amount = $scope.product.nowNum;
					if(Qtrget!=null){
						obj.fid = Qtrget.id;
					}else if ($scope.fristInvest.investCount==0&&$scope.FBQList.length>0) {
						obj.fid = $scope.FBQList[0].id;
					};
					resourceService.queryPost($scope,$filter('交互接口对照表')('invest'),obj,'确认投资');
				}
			break;
			case "返回":
				$scope.isShowOver = true;
			break;
			case "券":
				$scope.hb = event;
				if(Qtrget == null){
					event.sel=true;
					Qtrget=event;
				}else if(Qtrget == event){
					if(Qtrget.sel){
						event.sel=false;
						Qtrget=null;
						$scope.hb = null;
					}else{
						event.sel=true;	
						Qtrget=event;
					};
				}else{
					event.sel=true;
					Qtrget.sel=false;
					Qtrget=event;
				}
				$scope.isShowOver = true;
			break;
			case "请关注其他项目":
				$filter("跳转页面")('','main.billDetail','main.bankBillList');
			break;
		};
	};
	$scope.goPage = function (scope) {
        var obj={};
        obj.pageOn =  scope.bill.pageOn;
        obj.pageSize = scope.bill.pageSize;
        obj.pid = scope.product.id;
        resourceService.queryPost($scope,$filter('交互接口对照表')(scope.portName),obj,scope.portName);
     };
	/*菜单切换*/
	var beforEvent=null;
	function change(event) {
		if(beforEvent == null){
			beforEvent = event.currentTarget;
			if(event.currentTarget.className == 'actived'){

			}else{
				event.currentTarget.parentNode.children[0].className='';
				event.currentTarget.className = 'actived';
			};
		}else if(beforEvent == event.currentTarget){

		}else{
			event.currentTarget.className = 'actived';
			beforEvent.className = '';
			beforEvent = event.currentTarget;
		};
	}
	/*×××××菜单切换结束××××××××××*/
	function showDetail() {
		if($location.$$search.id != undefined){
			$localStorage.pathUrl = 'main.billDetail';
			resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),$location.$$search,'票据详情');
		}else{
			if ($scope.product!= undefined) {
				$localStorage.pathUrl = 'main.billDetail';
				resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),$scope.product,'票据详情');
			}else{
				$state.go('main.bankBillList');
			}
		}
	}
	showDetail();
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'用户信息');
	}
	// 监听退出是否成功
	$rootScope.$on('exitSuccess', function(event, flag) {
		if (flag) {
			$scope.isLogin = false;
			// resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),$location.$$search,'票据详情');
		}
	});
	// 未绑定银行卡时--去安全认证页面绑定
	$scope.bindBank = function() {
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.recharge','main.myAccount.security','setTruename',null,{name:'账户管理',url:'main.myAccount.security'});
	};

	$scope.changeGoldACT = function() {
    	$scope.goldACT = !$scope.goldACT;
    	if ($scope.goldACT) {
    		$scope.product.nowNum = 5000;
    	}
    };
}])