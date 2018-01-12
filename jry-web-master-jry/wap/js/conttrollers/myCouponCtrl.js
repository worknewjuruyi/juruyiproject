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
    });
})
