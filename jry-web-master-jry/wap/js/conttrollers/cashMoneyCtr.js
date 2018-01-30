define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controller-cashMoney', function ($scope,$sce,resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {          
        var time=new Date().getTime();
        var time2=new Date();
        $rootScope.newtime=time;
        
        $scope.isHeader=false;//是否显示头部 如果app传参跳转过来 header不显示 否则就是wap页面 则显示头部
        
//      console.log($stateParams.uid);                               
        
                                                             
    })
})