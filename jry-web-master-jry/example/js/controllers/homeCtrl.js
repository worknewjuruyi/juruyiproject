//home.html
/*首页*/
mainModule.controller('homeCtrl', function($rootScope,$scope,$state,$localStorage,resourceService,
										   communicationService,$filter,$document,$timeout,$location,$animate,$interval,ngDialog,$window) {
	$window.scrollTo(0,0);
	$filter('isLogin')($scope);
	$scope.showSummary=true;
	$rootScope.activeNav = 'home';
	$scope.newUser = {};
	if($localStorage.user != undefined){$scope.user = $localStorage.user;};
	$rootScope.title="巨和理财";
	//testby-ts-获取时间戳
	$scope.timer=new Date().getTime();
    // 轮播图数据初始化
    var slides = $scope.slides = [];
    // 首页邀请浮层
    $scope.isShowGangGao=false;
    // 浏览器判定
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    console.log(version);
    var trim_Version; 
    $scope.showAD = true;
    $localStorage.pathUrl = 'main.home';
    if($location.$$search.toFrom != undefined || $location.$$search.recommCode!= undefined||$location.$$search.tid!=undefined){
		$localStorage.webFormPath = $location.$$search;
	};
    if(version[1]!=undefined){
    	trim_Version = version[1].replace(/[ ]/g,""); 
    }else{
    	trim_Version = version[0].replace(/[ ]/g,""); 
    }
    if (browser == "Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
        $rootScope.isI8 = true;
    } else {
        $rootScope.isI8 = false;
    }
    var $noticeBoxDiv = $('.notice-box .con div');
    
    //此处的$on接收resourceService.js里的scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);data传来的信息
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		
//		console.log(data);
		//首页的banner图的信息在data.map.banner里
//		console.log(data.map.banner);
		
		switch(type){
			case "产品列表":
				$scope.map = data.map;
				$scope.listDatas = data.map.otherPro;
				$scope.newUser = data.map.fuiouNewhands;
				if ($scope.newUser == {}) {
					$scope.newUser = undefined;
				}
				// var temp = $scope.listDatas[0];
				// $scope.listDatas[0] = $scope.listDatas[1];
				// $scope.listDatas[1] = temp;
				$scope.activity = data.map.activity;
				$scope.periodPro = data.map.periodPro;
				$scope.investSendInfo = data.map.investSendInfo;
				$scope.periodProInvestCount = data.map.periodProInvestCount;
				$scope.activityInvestTotal = data.map.investTotal;
				if (data.map.isReservation != undefined) {
					$scope.isReservation = data.map.isReservation;
				} else {
					$scope.isReservation = false;
				};
			break;
			case "首页主数据":
				$scope.user = data.map;
				if (data.map.realName == '' || data.map.realName == undefined) {
					$scope.user.userName = '亲爱的用户';
				} else {
					$scope.user.userName = data.map.realName;
				}
				$localStorage.user = $scope.user;
			break;
			//banner的请求在下面
			case "获取首页广告":
				if (data.success) {
					if (data.map.floatList.length > 0) {
						$scope.floatList = data.map.floatList[0];
						if ($scope.floatList.location == '' || $scope.floatList.location == undefined) {
							$('.float-ad').html('<img src="'+ $scope.floatList.imgUrl +'">');
						}
					}
					if (data.map.popList.length > 0) {
						$scope.popList = data.map.popList[0];
					    if(!$localStorage.firstTime){
					    	$scope.isShowGangGao=true;
					        $localStorage.firstTime = new Date().getDate();
					    }else{
					        var day = new Date().getDate();
					        if($localStorage.firstTime != day){
					        	$scope.isShowGangGao=true;
					            $localStorage.firstTime = day;
					        }else{
					        	$scope.isShowGg=true;
					        }
					    }
					}
				}
			break;
			case "公司新闻":
				if(data.map.urgentNotice[0] != undefined){
					$localStorage.summaryContents = $scope.summaryContents = data.map.urgentNotice[0].summaryContents;
					$localStorage.summaryTime = $scope.summaryTime = data.map.urgentNotice[0].create_time;
					$scope.noticeList = data.map.urgentNotice;
					$scope.urgentNoticeList = data.map.urgentNotice;
					if ($scope.urgentNoticeList.length > 6) {
						$scope.urgentNoticeList = $scope.urgentNoticeList.slice(0,6);
					}
					if ($scope.noticeList.length > 1) {
						setInterval(function() {
							$noticeBoxDiv.animate({'margin-top': '-26px'},function() {
								$noticeBoxDiv.find('span').eq(0).appendTo($noticeBoxDiv);
								$noticeBoxDiv.css('margin-top', 0);
							});
						}, 4000);
					};
					
				} else {
					$scope.showSummary = false;
				}
				$scope.nowTimer=11;
				function setTimerOut() {
                    var timer = $timeout(
                        function() {
                            if($scope.nowTimer <= 0 ){
                            }else{
                                $scope.nowTimer-=1;
                                setTimerOut();
                            }
                        },
                        1000
                    );
                };
				setTimerOut();
				$scope.helps = data.map.questions;
				$scope.notice = data.map.notice;
				$scope.newsTitle = data.map.news[0];
			break;
			case "banner":
			    //$scope.banner的值传给ngInvestList.js里的derective('banner')
                $scope.banner = data.map.banner;
            break;
            case "新闻列表":
                $scope.news = data.map.page.rows;
                if ($scope.news.length>4) {
                	$scope.news.length = 4;
                }
            break;
		};
	});
	$scope.isShowGg=false;
	$scope.closeAD=function(){
        $document.find('.donghua').animate({
            width:"0",
            height:"0",
            opacity:"0",
            'margin':'50% 10px auto auto'
        },800,function(){
			$('.donghuawrap').hide();
			$scope.isShowGg=true;
        })
	}
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'首页主数据');
	}
	
	resourceService.queryPost($scope,$filter('交互接口对照表')('产品列表'),{},'产品列表');
	resourceService.queryPost($scope,$filter('交互接口对照表')('公司新闻'),{},'公司新闻');
	resourceService.queryPost($scope,$filter('交互接口对照表')('投资统计数据'),{},'投资统计数据');
	resourceService.queryPost($scope,$filter('交互接口对照表')('获取首页广告'),{},'获取首页广告');
	$scope.balanceShowType='隐藏';
	$scope.showBalance=true;
	$scope.onClickBalanceShow=function(event){
		if(event.target.innerText == '隐藏'){$scope.showBalance=false;$scope.balanceShowType='显示账户余额';}else{$scope.showBalance=true;$scope.balanceShowType='隐藏';};
	};
	/*退出*/
	$scope.userOut = function (type) {
		$filter('清空缓存')();
		resourceService.queryPost($scope,$filter('交互接口对照表')('退出接口'),{},'退出');
	};

	/*点击登录注册*/
	$scope.gotoLoginPage = function (type) {
		$filter("跳转页面")(type,'main.home','dl');
	};
	var mySwiper = new Swiper('.partner-box .swiper-container', {
        slidesPerView: 6,
        paginationClickable: true,
        loop: true,
        nextButton: '.button-next',
        prevButton: '.button-prev'
    });
    //首页banner请求 在这里
	resourceService.queryPost($scope,$filter('交互接口对照表')('banner'),{},'banner');
	resourceService.queryPost($scope, $filter('交互接口对照表')('新闻列表'),{
		pageOn:1,
		pageSize:5,
		proId:1
	},'新闻列表');

    var flagHd;
    if(sessionStorage.getItem("flagHdkey")=="true"){
        console.log(sessionStorage.getItem("flagHdkey"))
    }else{
        if(!$localStorage.user){    //没有登录的话
            $scope.wdlHdShow=true;
            $scope.hsbjShow=true;
            flagHd=true;
            $scope.dlHd=function () {
                $state.go("login");
                $filter("跳转页面")('denLu','main.luckDraw','login');
            }
            $scope.gbhsbj=function () {
                $scope.wdlHdShow=false;
                $scope.wdlHdShow2=false;
                $scope.wdlHdShow3=false;
                $scope.hsbjShow=false;
            }
            sessionStorage.setItem("flagHdkey", flagHd);
        }else{
            //判断有没有抽奖次数
            resourceService.queryPost($scope,$filter('交互接口对照表')('抽奖次数'),{},'我的抽奖');
            $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
                switch(type){
                    case "我的抽奖":
                        if(data.map.num==0){
                            $scope.wdlHdShow2=true;
                            $scope.hsbjShow=true;
                            flagHd=true;   //没有抽奖机会
                            $scope.gbhsbj=function () {
                                $scope.wdlHdShow=false;
                                $scope.wdlHdShow2=false;
                                $scope.wdlHdShow3=false;
                                $scope.hsbjShow=false;
                            };
                            $scope.yqhyHd=function () {
                                $state.go("main.myAccount.myFriend");
                            };
                            $scope.wytzHd=function () {
                                $state.go("main.productsList");
                            };
                        }else{
                            $scope.num=data.map.num;
                            $scope.wdlHdShow3=true;
                            $scope.hsbjShow=true;
                            flagHd=true;  //有抽奖机会的
                            $scope.gbhsbj=function () {
                                $scope.wdlHdShow=false;
                                $scope.wdlHdShow2=false;
                                $scope.wdlHdShow3=false;
                                $scope.hsbjShow=false;
                            };
                            $scope.ljcjHd=function () {
                                $state.go("main.luckDraw");
                            };
                            $scope.wytzHd=function () {
                                $state.go("main.productsList");
                            };
                        }
                        sessionStorage.setItem("flagHdkey", flagHd);
                        break;
                }
            });
        }
    }

})