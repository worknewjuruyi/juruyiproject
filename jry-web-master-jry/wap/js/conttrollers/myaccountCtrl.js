//myaccount/account-home.html
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    'use strict';
    controllers.controller(
        'accountHomeCtrl', function ($scope, resourceService, $filter, $state, $rootScope, $localStorage, ngDialog, $stateParams) {
        $rootScope.title = "我的账户";
        $filter('isPath')('main.myaccountHome');
        $scope.hongbaoShow = false;
        $scope.hongbaoShow2 = false;
        $scope.userOBJ = $filter('isRegister')();
        if ($scope.userOBJ.register) {
            $scope.user = $scope.userOBJ.user.member;
            resourceService.queryPost($scope, $filter('getUrl')('myacc'), {
                uid: $scope.user.uid
            }, '我的账户');
        } else {
            $state.go('login');
            return;
        };
        if ($stateParams.success == 'true') {
            if ($stateParams.type == 0) {
                ngDialog.open({
                    template: '<p class="error-msg">银行存管已开户</p>',
                    showClose: false,
                    closeByDocument: true,
                    plain: true
                });
            }
            else if ($stateParams.type == 1) {
                ngDialog.open({
                    template: '<p class="error-msg">充值成功</p>',
                    showClose: false,
                    closeByDocument: true,
                    plain: true
                });
            }
            else if ($stateParams.type == 2) {
                ngDialog.open({
                    template: '<p class="error-msg">提现成功</p>',
                    showClose: false,
                    closeByDocument: true,
                    plain: true
                });
            }
            else if ($stateParams.type == 3) {
                ngDialog.open({
                    template: '<p class="error-msg">修改存管交易密码成功</p>',
                    showClose: false,
                    closeByDocument: true,
                    plain: true
                });
            }
        }
        else if ($stateParams.errorCode == '9999') {
            $filter('服务器信息')($stateParams.errorCode, $scope, 'y')
        }
        else if ($stateParams.errorMsg) {
            ngDialog.open({
                template: '<p class="error-msg">' + $stateParams.errorMsg + '</p>',
                showClose: false,
                closeByDocument: true,
                plain: true
            });
        }
        else {
            ngDialog.closeAll();
        }
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch (type) {
                case '我的账户':
                    if (data.success) {
                        $scope.accunt = data.map;
                    } else {
                        $filter('服务器信息')(data.errorCode, $scope, 'y');
                    }
                    break;
            };
        });
        $scope.onClick = function (argument) {
            switch (argument) {
                case 'yes':
                    $filter('清空缓存')();
                    $state.go('login');
                    ngDialog.closeAll();
                    $scope.hongbaoShow = false;
                    $scope.hongbaoShow2 = false;
                    break;
            };
        };
    });
})
