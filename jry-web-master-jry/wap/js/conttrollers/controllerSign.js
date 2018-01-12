/* 
* @Author: lee
* @Date:   2016-01-10 23:29:04
* @Last Modified by:   anchen
* @Last Modified time: 2016-01-12 21:49:52
*/

//login/sign.html,


'use strict';

define([
    'js/module.js'
    , 'ngdialog'
]
    , function (controllers, ngdialog) {

        controllers.controller('controllerSign1'
            , ['$scope', '$rootScope'
                , 'resourceService'
                , '$filter'
                , '$state'
                , 'md5'
                , '$localStorage'
                , '$stateParams'
                , '$location'
                , function ($scope, $rootScope, resourceService, $filter, $state, md5, $localStorage, $stateParams, $location) {
                    if ($location.$$search.toFrom != undefined || $location.$$search.recommCode != undefined || $location.$$search.tid != undefined) {
                        $localStorage.webFormPath = $location.$$search;
                    };
                    $rootScope.title = '用户登录';
                    $scope.userLogin = {};
                    $scope.sbmit = function (tegForm) {
                        resourceService.queryPost($scope, $filter('getUrl')('login'), $scope.userLogin, { name: 'login', tegForm: tegForm });
                    }
                    if ($filter('isRegister')().user && $filter('isRegister')().user.member && $filter('isRegister')().user.member.uid) {
                        // if ($stateParams.returnurl) {
                        //     $state.go($stateParams.returnurl, { wap: true });
                        // } else {
                        //     $state.go("main.myaccountHome");
                        // }
                        if ($state.params.returnurl) {
                            if ($state.params.returnurl.indexOf('?') != -1) {
                                var router = $state.params.returnurl.split('?')[0];
                                var params = $state.params.returnurl.split('?')[1];
                                var obj = {};
                                var array = params.split("&");
                                if (array.length > 1) {
                                    for (var i = 0; i < array.length; i++) {
                                        obj[array[i].split("=")[0]] = array[i].split("=")[1];
                                    }
                                } else {
                                    obj[array[0].split("=")[0]] = array[0].split("=")[1];
                                }
                                obj.wap = true;
                                $state.go(router, obj);
                            } else {
                                $state.go($state.params.returnurl, { wap: true });
                            }
                        } else {
                            $state.go("main.myaccountHome");
                        }
                    }
                    $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
                        switch (type.name) {
                            case 'login':
                                if (data.success) {
                                    $localStorage.user = data.map;
                                    if ($state.params.returnurl) {
                                        if ($state.params.returnurl.indexOf('?') != -1) {
                                            var router = $state.params.returnurl.split('?')[0];
                                            var params = $state.params.returnurl.split('?')[1];
                                            var obj = {};
                                            var array = params.split("&");
                                            if (array.length > 1) {
                                                for (var i = 0; i < array.length; i++) {
                                                    obj[array[i].split("=")[0]] = array[i].split("=")[1];
                                                }
                                            } else {
                                                obj[array[0].split("=")[0]] = array[0].split("=")[1];
                                            }
                                            obj.wap = true;
                                            $state.go(router, obj);
                                        } else {
                                            $state.go($state.params.returnurl, { wap: true });
                                        }
                                    } else {
                                        $state.go("main.myaccountHome");
                                    }
                                    // }
                                } else {
                                    $filter('登录错误信息')(data.errorCode, $scope, 'y')

                                    $scope.userLogin.mobilephone = null;
                                    $scope.userLogin.passWord = null;
                                }
                                break;
                        };
                    });
                    $scope.toback = function () {
                        $filter('跳回上一页')();
                    };
                }
            ])
         
         //pages/GYWM.html
        // 关于我们
        controllers.controller('GYWMCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', function ($scope, $rootScope, resourceService, $http, $filter, $state) {
            $rootScope.title = $scope.title = '信息披露';
            $scope.wap = getUrlParam('wap');
            $filter('isPath')('GYWM');
            $scope.toback = function () {
                $filter('跳回上一页')(2);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
            $scope.goto = function (url) {
                switch (url) {
                    case '公司介绍':
                        if ($scope.wap == 'true') {
                            $state.go('GSJS', { wap: true });
                        }
                        else {
                            $state.go('GSJS');
                        }
                        break;
                    case '历程回顾':
                        if ($scope.wap == 'true') {
                            $state.go('LCHG', { wap: true });
                        }
                        else {
                            $state.go('LCHG');
                        }
                        break;
                    case '股东介绍':
                        if ($scope.wap == 'true') {
                            $state.go('GDJS', { wap: true });
                        }
                        else {
                            $state.go('GDJS');
                        }
                        break;
                    case '管理团队':
                        if ($scope.wap == 'true') {
                            $state.go('GLTD', { wap: true });
                        }
                        else {
                            $state.go('GLTD');
                        }
                        break;
                    case '公司资质':
                        if ($scope.wap == 'true') {
                            $state.go('GSZZ', { wap: true });
                        }
                        else {
                            $state.go('GSZZ');
                        }
                        break;
                    case '多重保障':
                        if ($scope.wap == 'true') {
                            $state.go('YYYZ', { wap: true });
                        }
                        else {
                            $state.go('YYYZ');
                        }
                        break;
                    case '网站公告':
                        if ($scope.wap == 'true') {
                            $state.go('WZGG', { wap: true });
                        }
                        else {
                            $state.go('WZGG');
                        }
                        break;
                };
            }
        }])
        //pages/GSJS.html
        // 公司介绍
        controllers.controller('GSJSCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '公司介绍';
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        
        //暂无controller
        // 历程回顾
        controllers.controller('LCHGCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '历程回顾';
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        //暂无controller
        // 股东介绍
        controllers.controller('GDJSCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '股东介绍';
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        //pages/GLTD.html
        // 管理团队
        controllers.controller('GLTDCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '管理团队';
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        //pages/GSZZ.html
        // 公司资质
        controllers.controller('GSZZCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '公司资质';
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        //pages/YYYZ.html
        // 多重保障
        controllers.controller('YYYZCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $rootScope.title = $scope.title = '多重保障';
            $scope.wap = getUrlParam('wap');
            $scope.page = 1;
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        
        //暂无controller对应
        // 股权结构
        controllers.controller('GQJGCtrl', ['$scope', '$rootScope', 'resourceService', '$http', '$filter', '$state', '$stateParams', function ($scope, $rootScope, resourceService, $http, $filter, $state, $stateParams) {
            $scope.wap = getUrlParam('wap');
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
        }])
        //pages/WZGG.html
        controllers.controller('WZGGCtrl', function ($scope, resourceService, $filter, $state,$rootScope) {
            $scope.wap = getUrlParam('wap');
            $rootScope.title = $scope.title = '网站公告';
            $filter('isPath')('WZGG');
            $scope.toback = function () {
                $filter('跳回上一页')(2);
            };
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            }
            var isLoad = true;
            var pageOn = 1;
            $scope.ggList = [];
            $scope.loadMore = function (item) {
                if (item.id == $scope.ggList[$scope.ggList.length - 1].id) {
                    if (isLoad) {
                        if (pageOn != $scope.page.pageOn) {
                            var obj = {
                                pageOn: pageOn,
                                pageSize: 10,
                                proId: 14
                            };
                            resourceService.queryPost($scope, $filter('getUrl')('网站公告'), obj, { name: '公告列表' });
                            isLoad = false;
                        }
                    };
                };
            };
            var objs = {};
            objs.proId = 14;
            resourceService.queryPost($scope, $filter('getUrl')('网站公告'), objs, { name: '公告列表' });
            $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
                switch (eObj.name) {
                    case '公告列表':
                        $scope.page = data.map.page;
                        if (pageOn == $scope.page.pageOn) {
                            isLoad = true;
                        }
                        if (data.map.page.pageOn <= data.map.page.totalPage) {
                            pageOn = $scope.page.pageOn + 1;
                            for (var i = 0; i < data.map.page.rows.length; i++) {
                                $scope.ggList.push(data.map.page.rows[i]);
                            }
                        } else {
                            isLoad = false;
                        }
                        break;
                };
            });
            $scope.goto = function (id) {
                if ($scope.wap == 'true') {
                    $state.go('GGXQ', { wap: true, artiId: id });
                }
                else {
                    $state.go('GGXQ', { artiId: id });
                }
            }
        })
        //pages/GGXQ.html
        controllers.controller('GGXQCtrl', function ($scope, resourceService, $filter, $stateParams, $state, $rootScope) {
            if ($stateParams.wap) {
                $scope.wap = $stateParams.wap;
            }
            $scope.from = $stateParams.from;
            $rootScope.title = $scope.title = '网站公告';
            $('body').scrollTop(0);
            var obj = {};
            if ($stateParams.from == 'kfr') {
                obj.openDayId = $stateParams.artiId;
                resourceService.queryPost($scope, $filter('getUrl')('getOpenDayArticleDetail'), obj, { name: '活动详情' });
            }
            else {
                obj.artiId = $stateParams.artiId;
                resourceService.queryPost($scope, $filter('getUrl')('公告详情'), obj, { name: '公告详情' });
            }
            $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
                switch (eObj.name) {
                    case '公告详情':
                        $scope.ggxq = data.map.sysArticle;
                        break;
                    case '活动详情':
                        $scope.ggxq = data.map.sysArticle;
                        break;
                };
            });
            $scope.toback = function () {
                $filter('跳回上一页')(1);
            };
            // $scope.goBack = function () {
            //     if ($stateParams.from == 'home') {
            //         $state.go('main.home');
            //     }
            //     else {
            //         $state.go('WZGG', { wap: true });
            //     }
            // }
        })
    })