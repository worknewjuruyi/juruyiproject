//recharge/rechargeConfirm.html
define(['js/module.js'], function (controllers) {
    controllers.controller('rechargeConfirmController', function ($scope, $filter, $state, $interval, $rootScope, resourceService, ngDialog, $stateParams, $localStorage, postcallService) {
        $rootScope.title = "充值";
        var user = $filter('isRegister')();
        $scope.isSubMin = true;
        $scope.nowTimer = "获取验证码";
        $scope.userForm = {};
        $scope.amt = $stateParams.amt;
        $scope.userForm.amt = $stateParams.amt;
        $scope.cangetyzm = true;
        $scope.hasgetyzm = false;
        var user = $filter('isRegister')();
        if (user.register != true) {
            $state.go('login', { returnurl: 'recharge' });
            return;
        }
        else {
            $scope.userForm.uid = user.user.member.uid;
            resourceService.queryPost($scope, $filter('getUrl')('充值index'), {uid:$scope.userForm.uid}, { name: '充值index' });
        }
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch (type.name) {
                case '充值index':
                    if (data.success) {
                        $scope.recharge = data.map;
                        if(data.map.bankMobilePhoneFuiou){
                            $scope.userForm.bank_mobile = data.map.bankMobilePhoneFuiou
                        }
                        else{
                            $scope.userForm.bank_mobile = '';
                        }
                    } else {
                        $filter('服务器信息')(data.errorCode, $scope, 'y');
                    }
                    break;
                case '存管充值验证码':
                    if (data.success) {
                        $filter('60秒倒计时')($scope, 180);
                        $rootScope.errorText = '验证码发送成功';
                        $rootScope.maskError = true;
                        $scope.isSubMin=false;
                        $scope.cangetyzm = true;
                        $scope.userForm.order = data.map.order;
                        $scope.hasgetyzm = true;
                    }
                    else {
                        $scope.cangetyzm = true;
                        $rootScope.errorText = data.errorMsg;
                        $rootScope.maskError = true;
                    }
                    break;
                case '存管充值':
                    if (data.success) {
                        ngDialog.open({
                            template: '<p class="error-msg">充值成功！</p>',
                            showClose: false,
                            closeByDocument: false,
                            plain: true
                        });
                        setTimeout(function() {
                            ngDialog.closeAll();
                            $filter('跳回上一页')(2);
                        }, 2000);
                    }
                    else if(!data.errorMsg){
                        $rootScope.errorText = '充值失败（'+data.errorCode+'）';
                        $rootScope.maskError = true;
                    }
                    else{
                        $rootScope.errorText = data.errorMsg;
                        $rootScope.maskError = true;
                    }
                    break;
            };
        });
        $scope.getyzm = function (tegForm) {
            if ($scope.isSubMin == true && $scope.cangetyzm == true) {
                if (tegForm.mobilephone.$error.required == true) {
                    $rootScope.errorText = '请输入银行预留手机号';
                    $rootScope.maskError = true;
                }
                else if (tegForm.mobilephone.$valid == false) {
                    $rootScope.errorText = '请输入正确的手机号码';
                    $rootScope.maskError = true;
                }
                else {
                    $scope.cangetyzm = false;
                    resourceService.queryPost($scope, $filter('getUrl')('存管充值验证码'),{
                        uid: $scope.userForm.uid,
                        amt: $scope.amt,
                        bank_mobile: $scope.userForm.bank_mobile
                    }, { name: '存管充值验证码' });
                }
            }
        };
        $scope.submitForm = function (valid) {
            if (!valid) {
                return;
            }
            if($scope.hasgetyzm==false){
                $rootScope.errorText = '请先获取验证码';
                $rootScope.maskError = true;
            }
            else{
                resourceService.queryPost($scope, $filter('getUrl')('存管充值'),$scope.userForm, { name: '存管充值' });
            }
        };
        $scope.toback = function () {
            $filter('跳回上一页')();
        };
    });
})