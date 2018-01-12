//cpDetail.html
define(['js/module.js', 'jquery', 'ngdialog','framework/mggScrollImg.js'], function (controllers, $, ngdialog,mggScrollImg) {
    controllers.controller('cpDetailCtrl', function ($scope, $rootScope, resourceService, $filter, $state, $stateParams, $location, $localStorage) {
        delete $localStorage.coupon;
        $filter('isPath')('cpDetail');
        $rootScope.title = "优选理财";
        $scope.toback = function () {
            $filter('跳回上一页')(2);
        };
        var user = $filter('isRegister')();
        $scope.active = 0;
        $scope.showBigImg = false;
        var $win = $(window);
        $('body').scrollTop(0);
        $win.on('load resize scroll', function () {
            $('.check-img-wrap').height($win.height()).width($win.width());
            $('.check-img-wrap img').css('max-height', $win.height()).css('max-width', $win.width());
        });
        $scope.slideToggle = function (e) {
            $(e.currentTarget).parent().siblings("p").stop().slideToggle(200);
            if ($(e.currentTarget).hasClass('slideDown')) {
                $(e.currentTarget).removeClass('slideDown')
            } else { $(e.currentTarget).addClass('slideDown') }
        };
        $scope.gologin = function () {
            $state.go('login', { returnurl: 'cpDetail?pid=' + $scope.cp.id + '&type=' + $scope.cp.type });
        };
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
            switch (eObj.name) {
                case 'cpDetail':
                    data.map.specialRate = parseFloat(data.map.specialRate);
                    $scope.cpObj = $localStorage.cp = data.map;
                    $scope.linkURL = data.map.linkURL;
                    $scope.cp = data.map.info;
                    $scope.cpType = data.map.info.type;
                    $rootScope.cpInfo = data.map.repair;
                    $scope.extendInfos = data.map.extendInfos;
                    if ($scope.cp.establish != undefined) {
                        var date3 = $scope.cp.establish - Date.parse(new Date());
                        var day = Math.floor(date3 / (24 * 3600 * 1000));
                        var hh = Math.floor(date3 / (3600 * 1000));
                        if (day > 0) {
                            $scope.nowTimer = day + '天';
                            // $scope.isFinish = true;
                        } else
                            if (day == 0 && hh > 1) {
                                $scope.nowTimer = hh + '小时';
                                // $scope.isFinish = true;
                                $scope.isBuTimer = true;
                            } else
                                if (day == 0 && hh < 1) {
                                    $scope.nowTimer = '1小时内'
                                    // $scope.isFinish = true;
                                } else
                                    if (hh < 0) {
                                        if ($scope.cp.type == 1) {
                                            $scope.nowTimer = '无限制';
                                        } else {
                                            $scope.nowTimer = '已结束';
                                        }
                                        $scope.isFinish = true;
                                    }
                    } else {
                        $scope.nowTimer = '已结束';
                        $scope.isFinish = true;
                    };
                    if ($stateParams.pid) {
                        resourceService.queryPost($scope, $filter('getUrl')('cpPicAndInvest'), {
                            pid: $stateParams.pid,
                            type: $scope.cp.type
                        }, { name: 'cpPicAndInvest' });
                    }
                    break;
                case 'cpPicAndInvest':
                    $scope.picList = data.map.picList;
                    $scope.investList = data.map.investList;
                    if($scope.picList.length > 0){//产品详情图片触摸切换
                        setTimeout(function(){
                            $scope.scrollImg = $.mggScrollImg('#imgbox ul',{
                                loop : true,//循环切换
                                auto : false,//自动切换
                                callback : function(ind){//这里传过来的是索引值
                                   // $('#page').text(ind+1);
                                }
                            });
                        },1000)
                    }
                    break;
                case '是否认证':
                    $scope.map = data.map;
                    break;
            };
        });

        $scope.showImg = function (event,i) {
            // $scope.bigImgSrc = $(event.currentTarget).attr('src');
            $scope.scrollImg.go(i);
            $scope.showBigImg = true;
        };

        if ($stateParams.pid != null) {
            var obj = {};
            obj.pid = $stateParams.pid;
            if (user.register) {
                obj.uid = user.user.member.uid;
                resourceService.queryPost($scope, $filter('getUrl')('我的信息'), {
                    uid: user.user.member.uid
                }, { name: '是否认证' });
            }
            resourceService.queryPost($scope, $filter('getUrl')('cpDetail'), obj, { name: 'cpDetail' });
        } else {
            $filter('跳回上一页')(1);
        };
        
        //newjs
        //进度条动画
        $(".bar-inner").animate({
        	"width":70+"%"
        },900);
        //优惠券       
        //优惠券弹窗弹出
        $scope.isShowCoupon=function(){
        	$(".coupon-list-mask").show();
            $(".coupon-list").slideDown();
        }
        
        //优惠券弹窗关闭按钮
        $scope.closeBtn=function(){
        	$(".coupon-list").slideUp("fast",function(){
        		$(".coupon-list-mask").hide();
        	});
        	
        }
        
        
        
        
        
        //上下滑动
        $scope.isDownUp=false;
        $(".touch-up").on("touchstart", function(e) {
		    e.preventDefault();
		    startX = e.originalEvent.changedTouches[0].pageX,
		    startY = e.originalEvent.changedTouches[0].pageY;
		});
		$(".touch-up").on("touchmove", function(e) {
		    e.preventDefault();
		    moveEndX = e.originalEvent.changedTouches[0].pageX,
		    moveEndY = e.originalEvent.changedTouches[0].pageY,
		    X = moveEndX - startX,
		    Y = moveEndY - startY;
		     
		    if ( Math.abs(Y) > Math.abs(X) && Y > 20) {
                //下滑
                $(".touch-up").removeClass("touch-down").children("p").html("上滑查看详情")
		    }
		    else if ( Math.abs(Y) > Math.abs(X) && Y < -20 ) {
		        //上滑
                $(".touch-up").addClass("touch-down").children("p").html("下滑关闭弹窗");
                $(".invest-detail").show()
		    }
		    
		});
		//产品详情弹出层
		$scope.showMode = 1;
        $scope.changeMode = function(type) {
            switch(type) {
                case 1: 
                    $scope.showMode = 1;
//                  if ($scope.one.request == false) {
//                      $scope.getData($scope.one);
//                  }
                break;
                case 2: 
                    $scope.showMode = 2;
//                  if ($scope.two.request == false) {
//                      $scope.getData($scope.two);
//                  }
                break;
                case 3: 
                    $scope.showMode = 3;
//                  if ($scope.three.request == false) {
//                      $scope.getData($scope.three);
//                  }
                break;
            }
        };

    })
})