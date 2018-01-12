//template/home.html,template/page-home.html
'use strict';
define(['js/module.js', 'jquery', 'ngdialog', 'radialIndicator'], function (controllers, $, ngdialog) {
    controllers.controller('pageHomeCtrl', function ($scope, $rootScope, $location) {
        $rootScope.title = "菠菜理财-国资全资控股平台";
        $scope.$on('$stateChangeSuccess',function(){
            // console.log($location.$$path);
            $scope.path = $location.$$path;
        })
        
    })
    controllers.controller('controllerHome', function ($scope, $rootScope, resourceService, $filter, $state, $localStorage, $location, $timeout,$sessionStorage) {
        $filter('isPath')('main.home');
        $scope.isLogin = $filter('isRegister')().register;
        $scope.hasLuckNum = -1;//抽奖次数
        if ($scope.isLogin) {
            $scope.user = $filter('isRegister')().user.member;
            resourceService.queryPost($scope, $filter('getUrl')('抽奖次数171016'), {uid: $scope.user.uid}, { name: '抽奖次数171016' });
            if($scope.user.realName){
                $scope.realInfo = $scope.user.realName;
            }
            else{
                $scope.realInfo = $scope.user.mobilephone;
            }
        }
        if ($location.$$search.toFrom != undefined || $location.$$search.recommCode != undefined || $location.$$search.tid != undefined) {
            $localStorage.webFormPath = $location.$$search;
        };
        // 首页信息
        var obj = {};
        if ($scope.user) { obj.uid = $scope.user.uid; }
        resourceService.queryPost($scope, $filter('getUrl')('shouYe'), obj, { name: 'index' });
        console.log($filter('getUrl')('shouYe'))
        // 公告
        resourceService.queryPost($scope, $filter('getUrl')('网站公告'), { proId: 14, pageSize: 3 }, { name: '公告列表' });
        var $dataTable = $('.notice-box ul');
        var height = $('.notice-box div').height();
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
        	console.log(data);
            switch (eObj.name) {
                case 'index':
                    $scope.index = data.map;
                    
                    $scope.banner = data.map.banner;
                    console.log($scope.banner)
                    break;
                case '公告列表':
                    if (data.success) {
                        $scope.gglist = data.map.page.rows;
                        if($scope.gglist.length>1){
                            setInterval(function() {
                                $dataTable.animate({'margin-top': '-'+height+'px'},1000,function() {
                                    $dataTable.find('li').eq(0).appendTo($dataTable);
                                    $dataTable.css('margin-top',0);
                                });
                            }, 3000);
                        }
                    }
                    break;
                case '抽奖次数171016':
                    if (data.success) {
                        $scope.hasLuckNum = data.map.num || 0;
                    }
                    break;
            };
        });
        $scope.radius = $('.rem-rule').width();

        //抽奖入口显示
        if($sessionStorage.modelCanEnter){
            $scope.modelCanEnter = false;
        }else{
            $scope.modelCanEnter = true;
            $sessionStorage.modelCanEnter = "hide";
        }
        $scope.closeEnter = function(){
            $scope.modelCanEnter = false;
        }
        $scope.$watch('modelCanEnter',function(newV,oldV){//阻止滚动穿透
            if(newV){
                $("html").css({'height': '100%','overflow': 'hidden'});
            }else{
                $("html").css({'height': 'auto','overflow': 'auto'});
            }
        });
		//点击活动按钮  跳转页面
		$scope.clickBtnGoPage = function(url,parms){
			$scope.modelCanEnter = false;
			$state.go(url, parms);
		}
    })
})