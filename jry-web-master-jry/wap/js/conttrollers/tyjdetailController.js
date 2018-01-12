//暂无controller对应
define(['jweixin', 'js/module.js', 'jquery', 'ngdialog'], function (wx, controllers, $, ngdialog) {
    controllers.controller('tyjdetailController', ['$scope', '$rootScope', 'resourceService', '$filter', '$state', '$stateParams', '$location', '$localStorage', function ($scope, $rootScope, resourceService, $filter, $state, $stateParams, $location, $localStorage) {
        $rootScope.title = "体验金专享";
        $filter('isPath')('tyjdetail');
        var user = $filter('isRegister')();
        if(user.register){
            resourceService.queryPost($scope, $filter('getUrl')('体验标详情'), {
                uid: user.user.member.uid
            }, '体验标详情');
        }
        else{
            $state.go('login');
        }
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, name) {
            switch (name) {
                case '体验标详情':
                    if (data.success) {
                        $scope.data = data.map;
                    } else {
                        $filter('服务器信息')(data.errorCode, $scope, 'y')
                    }
                    break;
                case '体验标投资':
                    if (data.success) {
                        $localStorage.tyjSuccessData = {};
                        $localStorage.tyjSuccessData = data.map;
                        $localStorage.tyjSuccessData.rate = $scope.data.Info.rate;
                        $localStorage.tyjSuccessData.amount = $scope.data.experienceAmount.experAmount;
                        if($scope.data.Info.activityRate>0){
                            $localStorage.tyjSuccessData.shouyi = $scope.data.experienceAmount.experAmount * ($scope.data.Info.rate+$scope.data.Info.activityRate) / 100 / 360 * 1;
                        }
                        else{
                            $localStorage.tyjSuccessData.shouyi = $scope.data.experienceAmount.experAmount * $scope.data.Info.rate / 100 / 360 * 1;
                        }
                        $localStorage.tyjSuccessData.activityRate = $scope.data.Info.activityRate;
                        $state.go('tyjSuccess');
                    } else {
                        $filter('服务器信息')(data.errorCode, $scope, 'y')
                    }
                    break;
            };
        });
        $scope.close = function(){
            $scope.confirm = false;
        }
        $scope.changeSelect = function(){
            $scope.canInvest = !$scope.canInvest;
        }
        $scope.investment = function(){
            // if($scope.data.isFuiou==0){
                // $('.depository').fadeIn(200);
            // }
            // else{
                resourceService.queryPost($scope, $filter('getUrl')('体验标投资'), {
                    uid: user.user.member.uid,
                    pid: $scope.data.Info.id,
                    ids: $scope.data.experienceAmount.ids
                }, '体验标投资');
            // }
        }
        $scope.toback = function () {
            $filter('跳回上一页')(2);
        };
    }])
})