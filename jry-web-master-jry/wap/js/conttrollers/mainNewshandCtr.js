
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('mainNewshandCtr', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $scope.isHeader=false;//是否显示头部 --app端跳转的不显示头部 wap的显示头部
     	//app传uid以及app=1
     	$scope.newuid=$stateParams.uid;//uid是否有uid
     	$scope.app=$stateParams.app;//是否app端跳转过来
     	$scope.isShowFooter=true;//初始化  是否显示新手推荐参数
     	$scope.goLink="javascript:void(0)";//初始化跳转链接地址
     	console.log($scope.isRegister)
     	
        resourceService.queryPost($scope, $filter('getUrl')('新手福利'),{uid:$scope.newuid},'新手福利');
     	$scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {   		
            switch (type) {
                case '首页':
                    if (data.success) {                            
                        $scope.simpleName=data.map.fuiouNewHand.simpleName;//标的标题
                        $scope.rate=data.map.fuiouNewHand.rate;//年化率
                        $scope.raiseDeadline=data.map.fuiouNewHand.raiseDeadline;//周期
                        $scope.surplusAmount=data.map.fuiouNewHand.surplusAmount;//剩余可投
                        console.log(data)
                    } else {
                        console.log(data.errorMsg);
                    }
                    break;                    
                case '新手福利':
                    if (data.success) {
                        //console.log(data.map);//打印主要数据
                        console.log(data.map.hasInvest);//是否投资
                        console.log(data.map.isFuiou);//是否开通存管
                        console.log(data.map.isRegister);//是否注册
                        //console.log(data.map.newProduct);//新手标信息
                        
                        $scope.fullName=data.map.newProduct.fullName;//标的标题
                        $scope.rate=data.map.newProduct.rate;//年化率
                        $scope.raiseDeadline=data.map.newProduct.raiseDeadline;//周期
                        $scope.surplusAmount=data.map.newProduct.surplusAmount;//剩余可投
                        $scope.pid=data.map.newProduct.id;//pid
//                      console.log($scope.pid)
                        
                        $scope.isRegister=data.map.isRegister;//是否投资
                        $scope.isFuiou=data.map.isFuiou;//是否开通存管
                        $scope.hasInvest=data.map.hasInvest;//是否投资
                        
                        if(data.map.isRegister){//是否注册
                        	$scope.goLink="javascript:void(0)";
                        }else{//未注册
                        	$scope.goLink="https://www.baidu.com?page=7";
                        }
                        
                        if (data.map.hasInvest) {//是否投资
                        	$scope.isShowFooter=false;
                        }
                        //
                    } else {
                        $scope.isRegister=false;
                        $scope.isFuiou=false;
                        $scope.hasInvest=false;
                        console.log(111111);
                    }
                    break;                    
            };
        });   
        //是否跳转注册
        $scope.goResiter=function(){
        	if ($scope.isRegister) {//已注册
        		  $filter("新手福利提示信息")(1);     		
        	}        	
        }
        
        
        //跳转到积分页面
        $scope.goJf=function(){
        	$state.go('newhand-jf',{isRegister:$scope.isRegister,app:$scope.app})
        }
        //跳转到红包页面
        $scope.goHb=function(){
        	$state.go('newhand-hb',{isRegister:$scope.isRegister,app:$scope.app})
        }
        //跳转到体验金页面
        $scope.goTyj=function(){
        	$state.go('newhand-tyj',{isRegister:$scope.isRegister,isFuiou:$scope.isFuiou,app:$scope.app})
        }
        //跳转到加息券页面
        $scope.goJxq=function(){
        	$state.go('newhand-jxq',{isRegister:$scope.isRegister,isFuiou:$scope.isFuiou,hasInvest:$scope.hasInvest,app:$scope.app})
        }
        
        
    })
})