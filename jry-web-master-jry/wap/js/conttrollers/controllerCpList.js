//template/cp/invests-list.html
define(['jweixin', 'js/module.js', 'ngdialog', 'radialIndicator'], function (wx, controllers, ngdialog, LuckyCard) {
    controllers.controller('controllerCpList', function ($scope, $rootScope, resourceService, $filter, $state, $localStorage, $anchorScroll, isWeixin, $timeout) {
        $rootScope.title = "我要投资";
        delete $localStorage.coupon;
        $filter('isPath')('main.bankBillList');
        resourceService.queryPost($scope, $filter('getUrl')('cplist'), { type: 2 }, { name: '产品列表' });
        var isLoad = true;
        var pageOn = 1;
        $scope.cpList = [];
        $scope.loadMore = function (item) {
            if (item.id == $scope.cpList[$scope.cpList.length - 1].id) {
                if (isLoad) {
                    if (pageOn != $scope.page.pageOn) {
                        var obj = {
                            pageOn: pageOn,
                            pageSize: 10
                        };
                        obj.type = 2;
                        resourceService.queryPost($scope, $filter('getUrl')('cplist'), obj, { name: '产品列表' });
                        isLoad = false;
                    }
                };
            };
        };
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
            switch (eObj.name) {
                case '产品列表':
                    $scope.page = data.map.page;
                    if (pageOn == $scope.page.pageOn) {
                        isLoad = true;
                    }
                    if (data.map.page.pageOn <= data.map.page.totalPage) {
                        pageOn = $scope.page.pageOn + 1;
                        for (var i = 0; i < data.map.page.rows.length; i++) {
                            $scope.cpList.push(data.map.page.rows[i]);
                        }
                    } else {
                        isLoad = false;
                    }
                    break;
                case 'goinvestment':
                    if (data.success) {
                        $localStorage.cp = data.map;
                        $state.go('investment');
                    }
                    break;
            };
        });
        $scope.radius = $('.rem-rule').width();
        
        
        
        //newjs
        //isShowNewFish-新手投资是否显示：后台获取用户是不是新手
        $scope.isShowNewFish=true;
        if ($scope.isShowNewFish) {
        	$scope.showMode = 1;
        } else{
        	$scope.showMode = 2;
        }
        
        $scope.changeMode = function(type) {
            switch(type) {
                case 1: 
                    $scope.showMode = 1;
//                  if ($scope.one.request == false) {
//                      $scope.getData($scope.one);
//                  }
                break;
                case 2: 
                    $scope.showMode = 2;
//                  if ($scope.two.request == false) {
//                      $scope.getData($scope.two);
//                  }
                break;
                case 3: 
                    $scope.showMode = 3;
//                  if ($scope.three.request == false) {
//                      $scope.getData($scope.three);
//                  }
                break;
            }
        };
    })
})

