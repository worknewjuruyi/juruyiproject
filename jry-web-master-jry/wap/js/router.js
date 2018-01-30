define(['jweixin', "app", 'filter', 'urlFilters', 'md5js', 'framework/slider.js'], function (wx, app) {
    var rootApp = app;
    rootApp.config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms|jsmp):/);
            // Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)
        }
    ]);
    rootApp.factory('httpInterceptor', ['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
        $rootScope.version = '1.0.0';
        $rootScope.channel = '3';
        var httpInterceptor = {
            'responseError': function (response) {
                return $q.reject("response", response);
            },
            'response': function (response) {
                // response.headers["Access-Control-Allow-Origin"]= "*";
                // response.headers["Access-Control-Allow-Methods"]="POST";
                // response.headers["Access-Control-Allow-Headers"]="x-requested-with,content-type";
                return response;
            },
            'request': function (config) {
                config.headers['X-Requested-With'] = "XMLHttpRequest";
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                // config.headers['Content-Type'] = 'application/json; charset=UTF-8;';
                return config;
            },
            'requestError': function (config) {
                return $q.reject(config);
            }
        };
        return httpInterceptor;
    }]);
    
    rootApp.factory('isWeixin', function () {
        return function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
    });
    
    rootApp.run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$localStorage',
        '$templateCache',
        function ($rootScope, $state, $stateParams, $localStorage, $templateCache) {
            $localStorage.pathUrl = [];
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.maskHidde = false;
            $rootScope.maskError = false;
            $rootScope.appPath = '../';
            var urlstr = window.location.href;
            if (urlstr.split('.com').length < 2 || (urlstr.split('.com').length > 1 && urlstr.split('.com')[1] == "/")) {
                if (urlstr.substring(urlstr.length - 1, urlstr.length) == "/") {
                    urlstr += "main/home";
                } else {
                    urlstr += "/main/home";
                }
            };
            $.ajax({
                url: '/product/signWeChat.dos',
                type: 'post',
                data: { url: urlstr, version: '1.0.0', channel: '3' },
                success: function (data) {
                    if (data.success) {
                        wx.config({
                            debug: false,
                            appId: data.map.appid,
                            timestamp: data.map.timestamp,
                            nonceStr: data.map.noncestr,
                            signature: data.map.sign,
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                        });
                    };
                }
            });
        }
    ])
        .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
            //用于改变state时跳至顶部
            // $uiViewScrollProvider.userAnchorScroll();
            $locationProvider.html5Mode(true);
            var date = "?date=" + new Date().getTime();

            // 默认进入先重定向
            var param = function (obj) {
                var query = '',
                    name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };
            // Override $http service's default transformRequest = 改变request payload 中的传参类型=str
            $httpProvider.defaults.transformRequest = [function (data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
            $httpProvider.interceptors.push('httpInterceptor');

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('main', {
                url: '/main',
                templateUrl: 'template/page-home.html' + date
            })
                .state('main.home', {
                    url: '/home',
                    templateUrl: 'template/home.html' + date
                })
                .state('/', {
                    url: '/',
                    templateUrl: 'template/default-page.html' + date
                })
                .state('login', {
                    url: '/login?returnurl',
                    templateUrl: 'template/login/sign.html' + date
                })
                /*静态页面*/
                .state('register', {
                    url: '/register?recommPhone&myPhone&myToFrom&maskType?frompc&toWhere&recommCode',
                    templateUrl: 'template/login/register.html' + date
                })
                .state('registerV1', {
                    url: '/registerV1?recommPhone&myPhone&myToFrom&maskType?frompc&toWhere&recommCode',
                    templateUrl: 'template/login/registerV1.html' + date
                })
                .state('regSuccess', {
                    url: '/regSuccess',
                    templateUrl: 'template/login/regSuccess.html' + date,
                    controller: 'regSuccess'

                })
                .state('main.more', {
                    url: '/more',
                    templateUrl: 'template/pages/more.html' + date
                })
                .state('GYWM', {
                    url: '/GYWM?wap',
                    templateUrl: 'template/pages/GYWM.html' + date
                })
                .state('GSJS', {
                    url: '/GSJS?wap',
                    templateUrl: 'template/pages/GSJS.html' + date
                })
                .state('GLTD', {
                    url: '/GLTD?wap',
                    templateUrl: 'template/pages/GLTD.html' + date
                })
                .state('GSZZ', {
                    url: '/GSZZ?wap',
                    templateUrl: 'template/pages/GSZZ.html' + date
                })
                .state('WZGG', {
                    url: '/WZGG?wap',
                    templateUrl: 'template/pages/WZGG.html' + date
                })
                .state('GGXQ', {
                    url: '/GGXQ?wap&artiId&from',
                    templateUrl: 'template/pages/GGXQ.html' + date
                })
                .state('YYYZ', {
                    url: '/YYYZ?wap',
                    templateUrl: 'template/pages/YYYZ.html' + date
                })
                .state('YJFK', {
                    url: '/YJFK',
                    templateUrl: 'template/pages/YJFK.html' + date
                })
                /*产品*/
                .state('newhand', {
                    url: '/newhand?pid',
                    templateUrl: 'template/newhand/newhand.html' + date,
                    controller: 'newhandCtrl'
                })
                .state('cpDetail', {
                    url: '/cpDetail?pid&uid&isShowRule&from&type',
                    templateUrl: 'template/cp/cpDetail.html' + date,
                    controller: 'cpDetailCtrl'
                })
                .state('newhandDetail', {
                    url: '/newhandDetail?pid',
                    templateUrl: 'template/cp/newhandDetail.html' + date,
                    controller: 'newhandDetailCtrl'
                })
                .state('aqbzDetail', {
                    url: '/aqbzDetail',
                    templateUrl: 'template/cp/aqbz.html' + date
                })
                .state('investment', {
                    url: '/investment?cpid&amt&pid&uid',
                    templateUrl: 'template/cp/investment.html' + date
                })
                .state('investSuccess', {
                    url: '/investSuccess',
                    templateUrl: 'template/cp/investSuccess.html' + date,
                    controller: "investSuccess"
                })
                .state('coupon', {
                    url: '/coupon?cpid&amt',
                    templateUrl: 'template/cp/coupon.html' + date
                })
                // 我的账户-体验金
                .state('myTyj', {
                    url: '/myTyj',
                    templateUrl: 'template/myaccount/myTyj.html' + date,
                    controller: 'myTyjController'
                })
                // 体验金详情页
                .state('tyjdetail', {
                    url: '/tyjdetail',
                    templateUrl: 'template/cp/tyjdetail.html' + date,
                    controller: 'tyjdetailController'
                })
                // 体验金投资成功页
                .state('tyjSuccess', {
                    url: '/tyjSuccess',
                    templateUrl: 'template/cp/tyjSuccess.html' + date,
                    controller: 'tyjSuccessController'
                })
                //我的账户
                .state('main.myaccountHome', {
                    url: '/myaccountHome?success&errorCode&errorMsg&amount&type',
                    templateUrl: 'template/myaccount/account-home.html' + date
                })
                .state('main.bankBillList', {
                    url: '/bankBillList',
                    templateUrl: 'template/cp/invests-list.html' + date
                })
                .state('investDetail', {
                    url: '/investDetail',
                    templateUrl: 'template/myaccount/invest-detail.html' + date
                })
                .state('investRecord', {
                    url: '/investRecord',
                    templateUrl: 'template/myaccount/invest-record.html' + date
                })
                .state('minxi', {
                    url: '/minxi',
                    templateUrl: 'template/myaccount/my-minxi.html' + date
                })
                .state('paybackDetail', {
                    url: '/paybackDetail',
                    templateUrl: 'template/myaccount/payback-detail.html' + date
                })
                .state('investProtocol', {
                    url: '/investProtocol',
                    templateUrl: 'template/myaccount/invest-investProtocol.html' + date
                })
                .state('myCoupon', {
                    url: '/myCoupon',
                    templateUrl: 'template/myaccount/myCoupon.html' + date
                })
                .state('myInvest', {
                    url: '/myInvest',
                    templateUrl: 'template/myaccount/my-invest.html' + date
                })
                .state('mycashed', {
                    url: '/mycashed?cashedId',
                    templateUrl: 'template/myaccount/my-cashed.html' + date
                })
                //充值首页
                .state('recharge', {
                    url: '/recharge?from',
                    templateUrl: 'template/recharge/recharge.html' + date
                })
                //充值确认页
                .state('rechargeConfirm', {
                    url: '/rechargeConfirm?amt',
                    templateUrl: 'template/recharge/rechargeConfirm.html' + date
                })
                .state('getCash', {
                    url: '/getCash',
                    templateUrl: 'template/recharge/get-cash.html' + date
                })
                .state('myInvitation', {
                    url: '/myInvitation',
                    templateUrl: 'template/myaccount/my-invitation.html' + date
                })
                .state('myInfo', {
                    url: '/myInfo',
                    templateUrl: 'template/myaccount/my-info.html' + date
                })
                .state('myBank', {
                    url: '/myBank',
                    templateUrl: 'template/myaccount/my-bank.html' + date
                })
                .state('znMessage', {
                    url: '/znMessage',
                    templateUrl: 'template/myaccount/zn-message.html' + date
                })
                .state('resetTradePwd', {
                    url: '/resetTradePwd?firstset&amt&cpid',
                    templateUrl: 'template/myaccount/reset-tradepwd.html' + date
                })
                .state('resetPwd', {
                    url: '/resetPwd?forget',
                    templateUrl: 'template/myaccount/reset-pwd.html' + date
                })
                .state('aqbz', {
                    url: '/aqbz?wap',
                    templateUrl: 'template/pages/AQBZ.html' + date
                })
                .state('inviteFriend1', {
                    url: '/inviteFriend1?wap&uid&channel',
                    templateUrl: 'template/activity/inviteFriend1.html' + date,
                    controller: 'inviteFriend1'
                })
                .state('friendreg', {
                    url: '/friendreg?frompc&recommCode',
                    templateUrl: 'template/activity/friendReg.html' + date,
                    controller: 'friendregController'
                })
                .state('appdownload', {
                    url: '/appdownload',
                    templateUrl: 'template/pages/appdownload.html' + date,
                    controller: 'appdownload'
                })
                .state('setDepository', {
                    url: '/setDepository',
                    templateUrl: 'template/myaccount/set-depository.html' + date,
                    controller: 'setDepositoryController'
                })
                // 我的信息进入的存管账户页面
                .state('myDepository', {
                    url: '/myDepository',
                    templateUrl: 'template/myaccount/my-depository.html' + date,
                    controller: 'myDepositoryController'
                })
                //维护页面
                .state('maintenance',{
                    url: '/maintenance',
                    templateUrl: "template/error/maintenance.html"
                })
                //体验金
                .state('tyjApp',{
                    url: '/tyjApp',
                    templateUrl: "template/pages/tyjApp.html"
                })
                .state('reminder',{
                    url: '/reminder',
                    templateUrl: "template/pages/reminder.html"
                })
                //抽奖活动
                .state('luckyDrawV1',{
                    url: '/luckyDrawV1?wap&uid&channel',
                    templateUrl: "template/activity/luckyDrawV1.html",
                    controller: "luckyDrawV1"
                })
                //
                //订单详情页面--my
                .state('invest-detailOrder',{
                    url: '/invest-detailOrder',
                    templateUrl: "template/cp/invest-orderDtailMy.html",                    
                })
                //协议页面--my
                .state('protocol',{
                    url: '/protocol',
                    templateUrl: "template/pages/protocol.html",                    
                })
                //签到页面--my
                .state('sign',{
                    url: '/sign?uid&token',
                    templateUrl: "template/myaccount/signMy.html",                    
                })
                
                
                //
                //理财商品已售罄-dcf
                .state('buy-end',{
	                 url:'/buy-end',
	                 templateUrl:'template/cp/buy-end.html'
                })
                //帮助与反馈-dcf
                .state('help-advice',{
	                 url:'/help-advice',
	                 templateUrl:'template/login/help-advice.html'
                })
                //收货地址-dcf
                .state('myaddress',{
	                 url:'/myaddress',
	                 templateUrl:'template/myaccount/myaddress.html'
                })
                //银行存管-dcf
                .state('bank-savermb',{
	                 url:'/bank-savermb',
	                 templateUrl:'template/cp/bank-savermb.html'
	//               controller:'controllerbkcq'
                })
                
                //充值提现帮助 -dcf
                .state('help-charge',{
	                 url:'/help-charge',
	                 templateUrl:'template/cp/help-charge.html'
                })
                //投资产品帮助 -dcf
                .state('help-tzcp',{
	                 url:'/help-tzcp',
	                 templateUrl:'template/cp/help-tzcp.html'
                })
                //活动奖励帮助 -dcf
                .state('help-hdjl',{
	                 url:'/help-hdjl',
	                 templateUrl:'template/cp/help-hdjl.html'
                })
                //安全中心-dcf
                .state('safeCenter',{
	                 url:'/safeCenter',
	                 templateUrl:'template/cp/safeCenter.html'
                })
                //自媒体-dcf
                .state('newsdt',{
	                 url:'/newsdt',
	                 templateUrl:'template/activity/newsdt.html'
                })
                //新闻动态-dcf
                .state('newstate',{
	                 url:'/newstate?artiId&uid',
	                 templateUrl:'template/activity/newstate.html'
                })
                //平台公告-dcf
                .state('balance-gg',{
	                 url:'/balance-gg',
	                 templateUrl:'template/activity/balance-gg.html'
                })
                //重新加载-dcf
                .state('fail-load',{
	                 url:'/fail-load',
	                 templateUrl:'template/activity/fail-load.html'
                })
                //提现-dcf
                .state('cash-money',{
	                 url:'/cash-money',
	                 templateUrl:'template/myaccount/cash-money.html'
                })
                //投资详情-dcf
                .state('pj-detail',{
	                 url:'/pj-detail',
	                 templateUrl:'template/cp/pj-detail.html'
                })
                //体验投资-dcf
                .state('try-label',{
	                 url:'/try-label',
	                 templateUrl:'template/pages/try-label.html'
                })
                //体验金-dcf
                .state('try-money',{
	                 url:'/try-money',
	                 templateUrl:'template/pages/try-money.html'
                })
                //活动中心-dcf
                .state('activity',{
	                 url:'/activity-center',
	                 templateUrl:'template/activity/activity-center.html'
                })
                //投资成功-dcf
                .state('invest-success',{
	                 url:'/invest-success',
	                 templateUrl:'template/myaccount/invest-success.html'
                })
                //公司资质-dcf
                .state('aptitude',{
	                 url:'/aptitude',
	                 templateUrl:'template/pages/aptitude.html'
                })

                
                
                
                
        })
    /*---------------------------Banner-----------------------------------*/
    rootApp.directive(
        'myBanner',
        function () {
            var temp = '<div class="swiper-container swiper-container-h" style="width:100%;height:13.54667rem">' +
                '<div class="swiper-wrapper">' +
                '</div>' +
                '<div class="swiper-pagination swiper-pagination-h"></div>' +
                '</div>';
            return {
                restrict: 'E',
                template: temp,
                replace: true,
                scope: {
                    banner: '='
                },
                controller: [
                    '$scope',
                    '$state',
                    'resourceService',
                    '$filter',
                    '$timeout',
                    '$element',
                    '$localStorage',
                    '$compile',
                    function ($scope, $state, resourceService, $filter, $timeout, $element, $localStorage, $compile) {
                        if ($localStorage.user != undefined) {
                            $scope.userId = '&uid=' + $localStorage.user.member.uid;
                        } else { $scope.userId = ''; };
                        var str = "";
                        $scope.$watch(function () { return $scope.banner }, function (n, o) {
                            if (n && n.length > 0) {
                                for (var i = 0; i < n.length; i++) {
                                    str += '<div class="swiper-slide"><a target="_blank" href="' + n[i].location + "&wap=true" + $scope.userId + '"><img ng-src="' + n[i].imgUrl + '" alt=""></a></div>';
                                }
                                $element[0].childNodes[0].innerHTML = str;
                                $compile($element[0].childNodes[0])($scope);
                                $timeout(function () {
                                    swiperH = new Swiper('.swiper-container-h', {
                                        pagination: '.swiper-pagination-h',
                                        paginationClickable: true,
                                        spaceBetween: 0,
                                        autoplay: 2500,
                                        autoplayDisableOnInteraction: false,
                                        preventClicks: false
                                    });
                                });
                            }
                        })
                    }],
            };
        }
    );
    rootApp.directive(
        'ngSwiper',
        function () {
            var temp = '<div class="swiper-container {{ngSwiper.name}}" ng-transclude>' +

                '</div>';
            return {
                restrict: 'A',
                template: temp,
                replace: true,
                scope: {
                    ngSwiperConf: '=',
                    ngSwiper: "="
                },
                transclude: true,
                controller: [
                    '$scope',
                    '$timeout',
                    '$element',
                    '$compile',
                    function ($scope, $timeout, $element, $compile) {
                        $scope.ngSwiper.initSwiper = function () {
                            $timeout(function () {
                                $scope.ngSwiper.swiper = new Swiper("." + $scope.ngSwiper.name, $scope.ngSwiperConf);
                            });
                        }
                        if ($scope.ngSwiper.readyLoading) {
                            $scope.ngSwiper.initSwiper();
                        }
                    }
                ],
            };
        });
    /*进度条*/
    rootApp.directive(
        'myCirclePlan',
        function () {
            var temp = '<div class="prg-cont rad-prg" id="progress">12</div>'
            return {
                restrict: 'E',
                // templateUrl:'template/cp/cpTpl.html',
                template: temp,
                replace: false,
                transclude: true,
                scope: true,
                controller: [
                    '$scope',
                    '$state',
                    'resourceService',
                    '$filter',
                    '$element',
                    function ($scope, $state, resourceService, $filter, $element) {

                        $('#progress1').radialIndicator({
                            initValue: 10,
                            displayNumber: false
                        });
                    }],
            };
        }
    );
    
    /*刮刮卡*/
    rootApp.directive(
        'ggk',
        function () {
            var temp = '<div id="scratch">' +
                '<div id="card">￥5000000元</div>' +
                '</div>'
            return {
                restrict: 'E',
                // templateUrl:'template/cp/cpTpl.html',
                template: temp,
                replace: false,
                transclude: true,
                scope: true,
                controller: [
                    '$scope',
                    '$state',
                    'resourceService',
                    '$filter',
                    '$element',
                    function ($scope, $state, resourceService, $filter, $element) {
                        // console.log(LuckyCard);
                    }],
            };
        }
    );

    // 提现金额小于余额
    rootApp.directive('withdrawlimit', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {
                ngModelController.$parsers.unshift(function (viewVal) {
                    if (scope.cash.funds <= 500000) {
                        if (viewVal == '') {
                            ngModelController.$setValidity("withdrawlimit", true);
                            return viewVal;
                        }
                        if (viewVal <= scope.cash.funds) {
                            ngModelController.$setValidity("withdrawlimit", true);
                            return viewVal;
                        }
                        else {
                            ngModelController.$setValidity("withdrawlimit", false);
                            return undefined;
                        }
                    } else {
                        ngModelController.$setValidity("withdrawlimit", true);
                        return viewVal;
                    }
                })
            }
        }
    });

    // 提现金额单笔最高限额
    rootApp.directive('maxlimit', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {

                ngModelController.$parsers.unshift(function (viewVal) {
                    if (scope.cash.funds > 500000) {
                        if (viewVal == '' || scope.cashForm.cash.$error.withdrawlimit) {
                            ngModelController.$setValidity("maxlimit", true);
                            return viewVal;
                        }
                        if (viewVal <= 500000) {
                            ngModelController.$setValidity("maxlimit", true);
                            return viewVal;
                        }
                        else {
                            ngModelController.$setValidity("maxlimit", false);
                            return undefined;
                        }
                    } else {
                        ngModelController.$setValidity("maxlimit", true);
                        return viewVal;
                    }
                });
            }
        };
    });

    // 输入金额大于1
    rootApp.directive('morethan', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {
                ngModelController.$parsers.unshift(function (viewVal) {
                    if (viewVal == '') {
                        ngModelController.$setValidity("morethan", true);
                        return viewVal;
                    }
                    if (viewVal >= 1) {
                        ngModelController.$setValidity("morethan", true);
                        return viewVal;
                    } else {
                        ngModelController.$setValidity("morethan", false);
                        return undefined;
                    }
                });
            }
        };
    });

    rootApp.directive('morethan3', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {
                ngModelController.$parsers.unshift(function (viewVal) {
                    if (viewVal == '') {
                        ngModelController.$setValidity("morethan3", true);
                        return viewVal;
                    }
                    if (viewVal >= 3) {
                        ngModelController.$setValidity("morethan3", true);
                        return viewVal;
                    } else {
                        ngModelController.$setValidity("morethan3", false);
                        return undefined;
                    }
                });
            }
        };
    });

    rootApp.directive('more3', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {
                ngModelController.$parsers.unshift(function (viewVal) {
                    if (viewVal == '') {
                        ngModelController.$setValidity("more3", true);
                        return viewVal;
                    }
                    if (viewVal >= 3) {
                        ngModelController.$setValidity("more3", true);
                        return viewVal;
                    } else {
                        ngModelController.$setValidity("more3", false);
                        return undefined;
                    }
                });
            }
        };
    });

    // 充值金额小于单笔限额
    rootApp.directive('rechargelimit', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelController) {

                ngModelController.$parsers.unshift(function (viewVal) {
                    if (viewVal == '') {
                        ngModelController.$setValidity("rechargelimit", true);
                        return viewVal;
                    }
                    if (viewVal <= scope.singleQuota) {
                        ngModelController.$setValidity("rechargelimit", true);
                        return viewVal;
                    } else {
                        ngModelController.$setValidity("rechargelimit", false);
                        return undefined;
                    }
                });
            }
        };
    });
    // 圆形进度条
    rootApp.directive('progressCircle', function () {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, element, attrs) {
                var config = {
                    radius: ($scope.radius - 8) / 2,
                    barWidth: 4,
                    barBgColor: '#EBEBEB',
                    percentage: false,
                    displayNumber: false,
                    roundCorner: false,
                    initValue: 0,
                    interpolate: true,
                    barColor: '#00CDB3',
                    frameTime: (1000 / attrs.progress)
                }
                if (attrs.progress >= 100) {
                    config.initValue = 100;
                    config.barColor = '#D6D6D6';
                }
                else if (attrs.progress <= 0) {
                    config.roundCorner = false;
                }
                var radialObj = $(element).radialIndicator(config).data('radialIndicator');
                radialObj.animate(attrs.progress);
            }
        }
    });
    // -----------------------------------------------server---------------------------------------------//
    rootApp.factory(
        'resourceService',
        ['$state', '$resource', '$http', '$rootScope', 'ngDialog', '$filter', '$localStorage', 'md5', '$location', 'isWeixin', function ($state, $resource, $http, $rootScope, ngDialog, $filter, $localStorage, md5, $location, isWeixin) {
            return new resourceService($resource, $http, $state, $rootScope, ngDialog, $filter, $localStorage, md5, $location, isWeixin);
        }]);
    function resourceService(resource, http, $state, $rootScope, ngDialog, $filter, $localStorage, md5, $location, isWeixin) {
        var actions = {
            'query': {
                method: 'GET'
            },
            'queryPost': {
                method: 'POST'
            },
            'toJsonP': {
                method: 'JSONP'
            }
        };
        //加载json模板页面
        this.getJsonPServer = function (scope, url, data, type) {
            showMask($rootScope);
            var queryResource = resource(url, {}, actions);
            queryResource.toJsonP(data, function (data) {
                removeMask($rootScope);
                scope.$broadcast('resourceService_GET_JSON.MYEVENT', data, type);
            }, function (error) {
                removeMask($rootScope);
                $filter('errorUserMessages')('netErro', ngDialog, scope);
            });
        };//加载json模板页面
        this.getJsonServer = function (scope, url, data, type) {
            showMask($rootScope);
            var queryResource = resource(url, {}, actions);
            queryResource.query(data, function (data) {
                removeMask($rootScope);
                scope.$broadcast('resourceService_GET_JSON.MYEVENT', data, type);
            }, function (error) {
                removeMask($rootScope);
                $filter('errorUserMessages')('netErro', ngDialog, scope);
            });
        };
        //查找
        this.queryPost = function (scope, url, data, type) {
//      	console.log(11111)
            scope.submitBool = false;
            // showMask($rootScope);
            /*临时改变时间*/
            var queryResource = resource(url, {}, actions);
            if (!data.version) {
                data.version = $rootScope.version;
            }
            if (!data.channel) {
                if (isWeixin() == true) {
                    data.channel = 5;
                }
                else {
                    data.channel = $rootScope.channel;
                }
            }
            if (!data.token) {
                data.token = $filter('isRegister')().user.token;
            }
            if (data.passWord != undefined) {
                data.passWord = hex_sha256(md5.createHash(data.passWord || ''));
            }
            if (data.tpwd != undefined) {
                data.tpwd = hex_sha256(md5.createHash(data.tpwd || ''));
            }
            if (data.tpw != undefined) {
                data.tpw = hex_sha256(md5.createHash(data.tpw || ''));
            }
            if (data.pwd != undefined) {
                data.pwd = hex_sha256(md5.createHash(data.pwd || ''));
            }
            queryResource.queryPost(data, function (data) {
                scope.submitBool = true;
                removeMask($rootScope);
                if (data.success) {
                    scope.$broadcast('resourceService.QUERY_POST_MYEVENT', data, type);
                } else {
                    if (data.errorCode == '9999') {
                        $filter('服务器信息')(data.errorCode, scope, 'y');
                        scope.onClick = function (type) {
                            if (type == 'yes') {
                                delete $localStorage.user;
                                ngDialog.close();
                                $state.go('main.home');
                            }
                        }
                    } else if (data.errorCode == '9998') {
                        $filter('实名认证错误信息')(data.errorCode, scope, 'y');
                        scope.onClick = function (type) {
                            if (type == 'yes') {
                                if (scope.channel == 1 || scope.channel == 2) {
                                    window.location.href = "jsmp://page=500?";
                                }
                                else {
                                    delete $localStorage.user;
                                    ngDialog.close();
                                    $state.go('login');
                                }
                            }
                        }
                    }
                    else {
                        scope.$broadcast('resourceService.QUERY_POST_MYEVENT', data, type);
                    }
                }
            }, function (error) {
                removeMask($rootScope);
            });
        };
        /******静态调结束*******/
        function showMask(rootSp) {
            rootSp.maskHidde = true;
        };
        function removeMask(rootSp) {
            rootSp.maskHidde = false;
        };
    };
    // 存管2.0
    rootApp.factory('postcallService', function () {
        return function (url, param, target) {
            var params = param;
            var tempform = document.createElement("form");
            tempform.action = url;
            tempform.method = "POST";
            tempform.style.display = "none";
            if (target) {
                tempform.target = target;
            }
            for (var x in params) {
                // if (x != 'signature') {
                var opt = document.createElement("input");
                opt.type = 'hidden';
                opt.name = x;
                opt.value = params[x];
                tempform.appendChild(opt);
                // }
            }
            // var opt = document.createElement("input");
            // opt.name = 'signature';
            // opt.type = 'hidden';
            // opt.value = params.signature;
            // tempform.appendChild(opt);
            document.body.appendChild(tempform);
            tempform.submit();
            document.body.removeChild(tempform);
        }
    })
    // 微信签名
    rootApp.factory('signWeChatService', function () {
        return function () {
            var urlstr = window.location.href;
            if (urlstr.split('.com').length < 2 || (urlstr.split('.com').length > 1 && urlstr.split('.com')[1] == "/")) {
                if (urlstr.substring(urlstr.length - 1, urlstr.length) == "/") {
                    urlstr += "main/home";
                } else {
                    urlstr += "/main/home";
                }
            };
            $.ajax({
                url: '/product/signWeChat.dos',
                type: 'post',
                data: { url: urlstr, version: '1.0.0', channel: '3' },
                success: function (data) {
                    if (data.success) {
                        wx.config({
                            debug: false,
                            appId: data.map.appid,
                            timestamp: data.map.timestamp,
                            nonceStr: data.map.noncestr,
                            signature: data.map.sign,
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                        });
                    };
                }
            });
        }
    })
});