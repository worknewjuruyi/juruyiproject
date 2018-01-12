//暂无controller与之对应
define(['js/module.js'], function(controllers) {
    controllers.controller('tyjSuccessController', ['$scope', '$rootScope', '$filter', '$state', 'resourceService','$localStorage', function($scope, $rootScope, $filter, $state, resourceService,$localStorage) {
        $rootScope.title = "投资成功";
        $scope.data={};
        $scope.user = $filter('isRegister')().user.member;
        if(!$scope.user){$state.go('login');return;}
        if($localStorage.tyjSuccessData){
            $scope.data=$localStorage.tyjSuccessData;
        }
        delete $localStorage.tyjSuccessData;
    }]);
})
