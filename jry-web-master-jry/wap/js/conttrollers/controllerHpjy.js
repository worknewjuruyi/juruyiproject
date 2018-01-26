//myaccount/my-invest.html

//define([
//  'js/module.js'
//  , 'framework/jquery-asPieProgress.js'
//  , 'framework/rainbow.min.js'
//  ]
//  ,function(controllers){
//  controllers.controller('controllerHpjy'
//      ,['$scope'
//      ,'$rootScope'
//      ,'$filter'
//      ,'$state'
//      ,'resourceService'
//      ,'$localStorage'
//      function($scope,$rootScope,$filter,$state,resourceService,$localStorage){
//          $rootScope.title="我的投资";
//           $filter('isPath')('setDepository');
//	        var jsonUrl='/data/ProvinceAndCity.json';
//	        
//	        console.log(11111)
//	       
//
//       	  $scope.changeToggle = function(event){
//       	  	console.log(11111)
//              $(".g-nav-ct main").hide();
//              if ($(event.currentTarget).siblings("main").hasClass("new")) {
//              	$(event.currentTarget).siblings("main").slideup().removeClass("new");
//              	
//              } else{
//              	$(event.currentTarget).siblings("main").slideDown().addClass("new")
//              }
//	            if($(event.currentTarget).find('i').hasClass('animation1')){
//	                $(event.currentTarget).find('i').removeClass('animation1').addClass('animation2');
//	            }
//	            else if($(event.currentTarget).find('i').hasClass('animation2')){
//	                $(event.currentTarget).find('i').removeClass('animation2').addClass('animation1');
//	            }
//	            else{
//	                $(event.currentTarget).find('i').addClass('animation1');
//	            }
//              
//	        }
//         
//		   
//      }
//  ]);
//})

//暂无controller对应
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controllerHpjy', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        console.log(11111)
	         
     	$scope.changeToggle = function(event){
     	  	console.log(11111)
//          $(".g-nav-ct main").slideUp();
            if ($(event.currentTarget).siblings("main").hasClass("new")) {            	
            	$(event.currentTarget).siblings("main").slideUp('slow').removeClass("new");
            	
            	$(event.currentTarget).find('i').removeClass('animation1').addClass('animation2');
            } else{
            	
            	$(event.currentTarget).siblings("main").slideDown('slow').addClass("new");
            	$(event.currentTarget).parent().siblings("div").children("main").slideUp('slow').removeClass("new")
            	
            	$(event.currentTarget).find('i').removeClass('animation2').addClass('animation1');
            	$(event.currentTarget).parent().siblings("div").find('i').addClass('animation2').removeClass('animation1');
            	
            }
            
        }
    })
})


//myaccount/my-invest.html