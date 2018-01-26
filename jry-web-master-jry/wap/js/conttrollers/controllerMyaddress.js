define([
    'js/module.js'
    , 'framework/jquery-asPieProgress.js'
    , 'framework/rainbow.min.js'
    ]
    ,function(controllers){
    controllers.controller('controllerMyaddress'
        ,['$scope'
        ,'$rootScope'
        ,'$filter'
        ,'$state'
        ,'resourceService'
        ,'$localStorage'
        ,function($scope,$rootScope,$filter,$state,resourceService,$localStorage){
        	$rootScope.title="收货地址";
        }
    ]);
})