//暂无controller对应
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controllerbkcq', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {	         
     	$scope.changeToggle = function(event){
            if ($(event.currentTarget).siblings("main").hasClass("new")) {   
            	$(event.currentTarget).siblings("main").slideUp('slow').removeClass("new");
            	
            	$(event.currentTarget).find('i').removeClass('animation1').addClass('animation2');
            } else{           	
              	$(event.currentTarget).siblings("main").slideDown('slow').addClass("new");
              	$(event.currentTarget).parent().siblings("div").children("main").slideUp('slow').removeClass("new");
              	$(event.currentTarget).find('i').removeClass('animation2').addClass('animation1');
                $(event.currentTarget).parent().siblings("div").find('i').removeClass('animation1');            	            		            		            	            	            	            		
            }
                                                                                                                                                
        }
    })
})