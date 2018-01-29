//template/cp/invests-list.html
define(['jweixin', 'js/module.js', 'ngdialog', 'radialIndicator'], function (wx, controllers, ngdialog, LuckyCard) {
    controllers.controller('controllerCpList', function ($scope, $rootScope, resourceService, $filter, $state, $localStorage, $anchorScroll, isWeixin, $timeout) {
        $rootScope.title = "我要投资";
        delete $localStorage.coupon;
        $filter('isPath')('main.bankBillList');
//      resourceService.queryPost($scope, $filter('getUrl')('cplist'), { type: 2 }, { name: '产品列表' });
        var isLoad = true;
        var pageOn = 1;
        $scope.cpList = [];
        $scope.loadMore = function (item) {
            if (item.id == $scope.cpList[$scope.cpList.length - 1].id) {
                if (isLoad) {
                    if (pageOn != $scope.page.pageOn) {
                        var obj = {
                            pageOn: pageOn,
                            pageSize: 10
                        };
                        obj.type = 2;
//                      resourceService.queryPost($scope, $filter('getUrl')('cplist'), obj, { name: '产品列表' });
                        isLoad = false;
                    }
                };
            };
        };
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
        	console.log(eObj)
            switch (eObj.name) {
                case '产品列表':
                    $scope.page = data.map.page;
                    if (pageOn == $scope.page.pageOn) {
                        isLoad = true;
                    }
                    if (data.map.page.pageOn <= data.map.page.totalPage) {
                        pageOn = $scope.page.pageOn + 1;
                        for (var i = 0; i < data.map.page.rows.length; i++) {
                            $scope.cpList.push(data.map.page.rows[i]);
                        }
                    } else {
                        isLoad = false;
                    }
                    break;
                case 'goinvestment':
                    if (data.success) {
                        $localStorage.cp = data.map;
                        $state.go('investment');
                    }
                    break;
            };
        });
        $scope.radius = $('.rem-rule').width();
        
        
        
        //newjs
        var name={name:'111',age:'2222'};
        
        
        //isShowNewFish-新手投资是否显示：后台获取用户是不是新手
        $scope.isShowNewFish=true;
        if ($scope.isShowNewFish) {
       	
        } else{
        	$(".tab-cpnox-newfish").remove();
        	$(".cpnox-newfish").remove(); 
        	$(".tab-cpnox-common h4").addClass("active");
        	$(".tab-cpnox-common div").addClass("red-line");
        	
        }     
//      $scope.changeMode = function(type) {
//          switch(type) {
//              case 1: 
//                  $scope.showMode = 1;
//              break;
//              case 2: 
//                  $scope.showMode = 2;
//              break;
//              case 3: 
//                  $scope.showMode = 3;
//              break;
//          }
//      };
        //swiper
        var aButton=$('.tab-header li');
        var aButton2=document.querySelectorAll('.tab-header ul li');
        var mySwiper = new Swiper ('.swiper-container', {
		    speed:300,
//          autoHeight: true, 
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
            currentIndex=this.index;
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
    })
})

