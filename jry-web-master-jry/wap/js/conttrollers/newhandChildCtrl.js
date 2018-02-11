
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
	//新手福利-红包页面
    controllers.controller('newhandHbCtr', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $scope.isHeader=false;//是否显示头部 --app端跳转的不显示头部 wap的显示头部
     	$scope.goLink="javascript:void(0)";
     	var newisRegister=$stateParams.isRegister;//是否注册
     	console.log(newisRegister);
     	if (newisRegister=="true") {//已注册
	     	$scope.goLink="javascript:void(0)";
	    }else if(newisRegister=="false"){
     		$scope.goLink="https://www.baidu.com?page=7";
     	}
     	$scope.isGo=function(){
     		if (newisRegister=="true") {//已注册提示弹窗
	     		$filter("新手福利提示信息")(4);
	     	} 
     	}     	     	
    })
    //新手福利-积分页面
    controllers.controller('newhandJfCtr', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $scope.isHeader=false;//是否显示头部 --app端跳转的不显示头部 wap的显示头部
     	$scope.goLink="javascript:void(0)";
     	var newisRegister=$stateParams.isRegister;//是否注册
     	console.log(newisRegister);
     	if (newisRegister=="true") {
	     	$scope.goLink="javascript:void(0)";
	    }else if(newisRegister=="false"){
     		$scope.goLink="https://www.baidu.com?page=7";
     	}
     	$scope.isGo=function(){
     		if (newisRegister=="true") {
	     		$filter("新手福利提示信息")(3);
	     	} 
     	}
     	
    })
    //新手福利-加息券页面
    controllers.controller('newhandJxqCtr', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $scope.isHeader=false;//是否显示头部 --app端跳转的不显示头部 wap的显示头部
     	$scope.goLink="javascript:void(0)";
     	var newisRegister=$stateParams.isRegister;//是否注册
     	var newisFuiou=$stateParams.isFuiou;//是否开通存管
     	var newhasInvest=$stateParams.hasInvest;//是否投资过
     	console.log(newisRegister);
     	console.log(newisFuiou);
     	console.log(newhasInvest);
     	if (newhasInvest=="true") {
	     	$scope.goLink="javascript:void(0)";
	    }else if(newhasInvest=="false"){
     		if (newisRegister=="true"&&newisFuiou=="true"){
     			$scope.goLink="https://www.baidu.com?page=8";
     		} else{
     			if (newisRegister!="true") {
     				$scope.goLink="https://www.baidu.com?page=7";
     			}else if(newisFuiou!="true"){
     				$scope.goLink="https://www.baidu.com?page=27";
     			}
     		}
     	}
     	$scope.isGo=function(){
     		if (newhasInvest=="true") {
	     		$filter("新手福利提示信息")(6);
	     	} 
     	}
     	
    })
    //新手福利-体验金页面
    controllers.controller('newhandTyjCtr', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $scope.isHeader=false;//是否显示头部 --app端跳转的不显示头部 wap的显示头部
     	$scope.goLink="javascript:void(0)";
     	var newisRegister=$stateParams.isRegister;//是否注册
     	var newisFuiou=$stateParams.isFuiou;//是否开通存管
     	console.log(newisRegister);
     	console.log(newisFuiou);
     	if (newisFuiou=="true") {
	     	$scope.goLink="javascript:void(0)";
	    }else if(newisFuiou=="false"){
     		if (newisRegister=="true"){
     			$scope.goLink="https://www.baidu.com?page=27";
     		} else{
     			$scope.goLink="https://www.baidu.com?page=7";
     		}
     	}
     	$scope.isGo=function(){
     		if (newisFuiou=="true") {
	     		$filter("新手福利提示信息")(5);
	     	} 
     	}
     	
    })
})