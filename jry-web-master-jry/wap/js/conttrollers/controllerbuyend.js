//myaccount/my-invest.html

define([
    'js/module.js'
    , 'framework/jquery-asPieProgress.js'
    , 'framework/rainbow.min.js'
    ]
    ,function(controllers){
    controllers.controller('controllerbuyend'
        ,['$scope'
        ,'$rootScope'
        ,'$filter'
        ,'$state'
        ,'resourceService'
        ,'$localStorage'
        ,function($scope,$rootScope,$filter,$state,resourceService,$localStorage){
            $rootScope.title="我的投资";
            
           //isShowNewFish-新手投资是否显示：后台获取用户是不是新手
		        $scope.isShowNewFish=true;
		        if ($scope.isShowNewFish) {
		         $scope.showMode = 1;
		        } else{
		         $scope.showMode = 2;
		        }
		        
		      $scope.upDownClick = function(event) {
                var $this = $(event.currentTarget),
                    $thisCon = $this.parents('.con');
                if ($thisCon.hasClass('active')) {
                    $thisCon.removeClass('active');
                } else {
                    $thisCon.addClass('active');
                }
            };
		        $scope.changeMode = function(type) {
		        	 var $triggerAct = $('.trigger-wrap .active');
		            switch(type) {
		                case 1: 
		                    $scope.showMode = 1;
		
		                break;
		                case 2: 
		                    $scope.showMode = 2;
		                break;

		            }
		       };
		       //swiper
	        var aButton=$('.trigger-wrap li');
	        var aButton2=document.querySelectorAll('.trigger-wrap ul li');
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
		  
		  function tabProductMenu(obj){
          for(var i=0;i<aButton.length;i++){
            $('.trigger-wrap li').find("span").removeClass('active');
            $('.trigger-wrap li').find("div").removeClass('red-line');
	          }
	          $('.trigger-wrap li').eq(obj).find("span").addClass('active');
	          $('.trigger-wrap li').eq(obj).find("div").addClass('red-line');
	        }
		  
		  
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
        }
    ]);
})



//myaccount/my-invest.html

