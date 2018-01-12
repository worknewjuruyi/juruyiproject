
/* 
* @Author: xyc
* @Date:   2016-01-18 23:29:04
*/
//pages/more.html
define([
    'js/module.js'
    ]
    ,function(controllers){
    controllers.controller('moreController'
        ,['$scope'
        ,'$filter'
        ,'$state'
        ,function($scope,$filter,$state){
            $filter('isPath')('main.more');
            $scope.out=function (argument) {
                switch(argument){
                    case 'out': 
                        $filter('清空缓存')();
                        $state.go('main.home');
                    break;
                };
            }
        }
    ]);
    controllers.controller('YJFKController'
        ,['$scope'
        ,'$filter'
        ,'$state'
        ,'resourceService'
        ,function($scope,$filter,$state,resourceService){
            $scope.userOBJ = $filter('isRegister')();

            $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
                
                switch(type){
                    case '意见反馈': 
                        if(data.success){
                            $filter('意见反馈信息')('ok',$scope,'y');
                        }else{
                            $filter('意见反馈信息')(data.errorCode,$scope,'y');
                        }
                    break;
                };
            }); 
            $scope.toSub=function () {
                if (!$scope.userOBJ.register) {
                    $state.go('login');
                } else {
                    resourceService.queryPost($scope, $filter('getUrl')('意见反馈'), {
                        uid:$scope.userOBJ.user.member.uid,
                        contactInformation:$scope.userOBJ.user.member.mobilephone,
                        content:$scope.content
                    }, '意见反馈');
                }
            }
        }
    ]);
})