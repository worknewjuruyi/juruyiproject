//myaccount/myCoupon.html
'use strict';
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('myCouponCtrl', function ($scope, resourceService, $filter, $state, $rootScope, $localStorage) {
        $rootScope.title = '我的红包';
        $scope.userOBJ = $filter('isRegister')();
        $filter('isPath')('myCoupon');
        if (!$scope.userOBJ.register) {
            $state.go("login");
            return;
        }
        $scope.active = 0;
        $scope.showDownload = true;
        resourceService.queryPost($scope, $filter('getUrl')('我的红包'), {
            uid: $scope.userOBJ.user.member.uid,
            status: $scope.active,
            flag: 1,
        }, '我的红包');
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch (type) {
                case '我的红包':
                    if (data.success) {
                        // console.log(data)
                        $scope.coupons = data.map.list;
                    } else {
                        $filter('服务器信息')(data.errorCode, $scope, 'y')
                    }
                    break;
            };
        });
        $scope.onClick = function (num) {
            $scope.active = num;
            $scope.coupons = [];
            resourceService.queryPost($scope, $filter('getUrl')('我的红包'), {
                uid: $scope.userOBJ.user.member.uid,
                status: $scope.active,
                flag: 1,
            }, '我的红包');
        };
        $scope.toback = function () {
            $filter('跳回上一页')(2);
        };
        
        
        //newjs
        //swiper
        var aButton=$('.tab-header li');
        var aButton2=document.querySelectorAll('.tab-header ul li');
        var mySwiper = new Swiper ('.swiper-container', {
		    speed:300,
		    freeMode:false,
		    observer:true,//修改swiper自己或子元素时，自动初始化swiper ** 
            observeParents:true,//修改swiper的父元素时，自动初始化swiper**  
            autoHeight: true, 
            onSlideChangeStart: function(ev){
	            var _index = mySwiper.activeIndex//*************this
	            var distance = _index;
	            tabProductMenu(_index);//*************this
	            //请求数据
	        }
            
		}) 
        // 切换页面
		for(var i=0;i<aButton2.length;i++){		  
          aButton2[i].index=i;
          aButton2[i].addEventListener('touchend',function(){
            var currentIndex=this.index;
            tabProductMenu(currentIndex);            
            mySwiper.slideTo(currentIndex,400,false,true);
            //请求数据
            
            
            
            return false;
          },false)
        }
        function tabProductMenu(obj){
          for(var i=0;i<aButton.length;i++){
            $('.tab-header li').find("h4").removeClass('active');
            $('.tab-header li').find("div").removeClass('red-line');
          }
          $('.tab-header li').eq(obj).find("h4").addClass('active');
          $('.tab-header li').eq(obj).find("div").addClass('red-line');
        }
        
        // 设置上拉加载数据 同时自适应高度
        //募集中
        var srollsFirst = document.getElementById('slide1');
        var myscrollFirst = new iScroll(srollsFirst,{
          vScrollbar: false,
          onScrollEnd: function(){
            if( (this.y == this.maxScrollY)) {	
              // 加载数据
              setTimeout(function(){	              	
                myscrollFirst.refresh();
              },10)
            }
            else{

            }
          }
        })
        //投资中
        var srollsFirst = document.getElementById('slide2');
        var myscrollFirst = new iScroll(srollsFirst,{
          vScrollbar: false,
          onScrollEnd: function(){
            if( (this.y == this.maxScrollY)) {	              
              // 加载数据
              setTimeout(function(){	              	
                myscrollFirst.refresh();
              },10)
            }
          }
        })
        //已回款
        var srollsFirst = document.getElementById('slide3');
        var myscrollFirst = new iScroll(srollsFirst,{
          vScrollbar: false,
          onScrollEnd: function(){
            if( (this.y == this.maxScrollY)) {	              
              // 加载数据
              setTimeout(function(){	              	
                myscrollFirst.refresh();
              },10)
            }
          }
        })
    });
})
