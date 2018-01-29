//myaccount/my-invest.html
define([
    'js/module.js'
    , 'framework/jquery-asPieProgress.js'
    , 'framework/rainbow.min.js'    
    ]
    ,function(controllers){
    controllers.controller('myInvestCtrl'
        ,['$scope'
        ,'$rootScope'
        ,'$filter'
        ,'$state'
        ,'resourceService'
        ,'$localStorage'
        ,'$http'
        ,function($scope,$rootScope,$filter,$state,resourceService,$localStorage,$http){            
            //newjs
            //success/error -->not under angular-1.5+(use then method)

                        
            //swiper                                               
	        var aButton=$('.tab-header li');
	        var aButton2=document.querySelectorAll('.tab-header ul li');
	        var mySwiper = new Swiper ('.swiper-container', {
			    speed:300,
			    freeMode:false,
			    observer:true,//修改swiper自己或子元素时，自动初始化swiper ** 
	            observeParents:true,//修改swiper的父元素时，自动初始化swiper**  
//	            autoHeight: true, 
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
	        
	        //无数据显示内容
	        $scope.nodata=false;
	        
	        
	        // 设置上拉加载数据 同时自适应高度
	        //募集中
	        var srollsFirst1 = document.getElementById('slide1');
	        var myscrollFirst = new iScroll(srollsFirst1,{
	          vScrollbar: false,
	          onScrollEnd: function(){
	            if( (this.y == this.maxScrollY)) {	
//	               $(".myinvest-top-msg").slideUp();
//	               $(".income-data").slideUp();

	              // 加载数据
	              setTimeout(function(){	              	
	                myscrollFirst.refresh();
	              },10)
	            }
	            else{
//	               $(".myinvest-top-msg").slideDown();
//	               $(".income-data").slideDown()
	            }
	          }
	        })
	        //投资中
	        var srollsFirst2 = document.getElementById('slide2');
	        var myscrollFirst2 = new iScroll(srollsFirst2,{
	          vScrollbar: false,
	          onScrollEnd: function(){
	            if( (this.y == this.maxScrollY)) {	              
	              // 加载数据
	              setTimeout(function(){	              	
	                myscrollFirst2.refresh();
	              },10)
	            }
	          }
	        })
	        //已回款
	        var srollsFirst3 = document.getElementById('slide3');
	        var myscrollFirst3 = new iScroll(srollsFirst3,{
	          vScrollbar: false,
	          onScrollEnd: function(){
	            if( (this.y == this.maxScrollY)) {	              
	              // 加载数据
	              setTimeout(function(){	              	
	                myscrollFirst3.refresh();
	              },10)
	            }
	          }
	        })
        }
    ]);
})