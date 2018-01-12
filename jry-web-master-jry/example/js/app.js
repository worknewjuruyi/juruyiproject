var routerApp = angular.module('someApp', ['ui.router','loginModule','ngDialog','ngResource','mainModule','ui.bootstrap','ngAnimate','monospaced.qrcode','angular-md5'
    // ,'investListModule'
    ]);
routerApp.run(function($rootScope, $state, $stateParams,$location,$http,$templateCache,$filter,resourceService,$localStorage,ngDialog){
        // console.log(BizQQWPA);
        // BizQQWPA.addCustom();
        $rootScope.$state = $state;
        $rootScope.webPath = '/';
        $rootScope.hrefUrl = '';
        $rootScope.v = 'v1.0.0';
        $rootScope.$stateParams = $stateParams;        
        var date= 
        $rootScope.maskHidde = false;

        $rootScope.$on('LOGIN_DEL_X-REQU',function(){
            delete $http.defaults.headers.common['X-Requested-With'];
        });
        $rootScope.$on('LOGIN_OUT',function(event,url){
            delete $localStorage.user;
            $templateCache.remove(url);
            resourceService.queryPost($rootScope,$filter('交互接口对照表')('退出接口'),{},'退出');
            if($localStorage.pathUrl != undefined){
                var pth = $localStorage.pathUrl.replace('/','').replace('mainmyAccount', 'main.myAccount.')
            }else{
              $localStorage.pathUrl = pth = 'main.home';
            }
            if(pth.indexOf('main.myAccount')){
                $filter("跳转页面")('denLu',$localStorage.pathUrl,$localStorage.pathUrl);
            }else if(pth.indexOf('main.newDetail')){
            }else if(pth.indexOf('newFriend')){
            }else{
                $filter("跳转页面")('denLu',$localStorage.pathUrl,'dl');
            }
            
            $rootScope.maskHidde = false;
        });

        // 复投红包事件
        $rootScope.promoteGoToUse = function(item) {
            $rootScope.promoteRedBagFid = item.id;
            $localStorage.promoteEnableAmount = item.enableAmount;
            resourceService.queryPost($rootScope,$filter('交互接口对照表')('获取变现产品'),{fid: item.id},'获取变现产品');
        };


        $rootScope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
            switch(type){
                case '获取变现产品':
                    if (data.success) {
                        ngDialog.closeAll();
                        if (data.map.pid) {
                            if (data.map.pid == -1) {
                                $state.go('main.productsList');
                            } else {
                                $state.go('main.billDetail',{id:data.map.pid,redBagFid:$rootScope.promoteRedBagFid});
                            }
                        }
                    }
                break;
            };
        });
    })
routerApp.factory('httpInterceptor', [ '$q', '$injector','$rootScope',function($q, $injector,$rootScope) {  
    var httpInterceptor = {   
        'responseError' : function(response) {
            return $q.reject("response",response);
        },
        'response' : function(response){
            if(response.headers("sessionstatus")=="timeout" ){
                if(response.config.url  != "Login" && response.config.url !="user/toLogin"){
                    $rootScope.$emit("LOGIN_OUT",response.config.url);
                    return false;
                }
            }
            return response;
        },  
        'request' : function(config) {
            if(config.url != "Login" && config.url !="user/toLogin" && config.url !="/user/findWhiteCollarApartmentByUserName"){
                config.headers['X-Requested-With']="XMLHttpRequest";
            }
            return config;
        },  
        'requestError' : function(config){  
            return $q.reject(config); 
        }  
    };
return httpInterceptor;  
}]);
routerApp.config([ '$httpProvider','$stateProvider','$urlRouterProvider','$sceProvider','$locationProvider',function($httpProvider,$stateProvider, $urlRouterProvider,$sceProvider,$locationProvider){
    $httpProvider.interceptors.push('httpInterceptor');
    // $sceProvider.enabled(false);
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');//mainwelcome maintradepasswdSet
    var sta='';
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: sta + 'html/global2.html'
        })
        .state('main', {
            url: '/main',
            templateUrl: sta + 'html/global.html'
        })
        .state('404', {
            url: '/404',
            templateUrl: sta + 'html/404.html'
        })
        /*登录*/
        .state('login', {
            url: '/login?fromActivity',
            templateUrl: sta + 'html/login/login.html'
        })
        /*注册*/
        .state('register', {
            url: '/register?recommPhone&toFrom&recommCode',
            templateUrl: sta + 'html/login/register.html'
        })
        /* 找回密码 */
        .state('main.resetPasswd', {
            url: '/resetPasswd',
            templateUrl: sta + 'html/reset-passwd.html'
        })
        .state('main.home', {
            url: '/home',
            templateUrl: sta + 'html/home.html'
        })
        /*产品安选列表页*/
        .state('main.productsList', {
            url: '/productsList',
            templateUrl:sta +  'html/bill-list-new.html'
        })
        /*产品详情页*/
        .state('main.billDetail', {
            url: '/billDetail?id&redBagFid',
            templateUrl: sta + 'html/bill-detail.html'
        })
        .state('main.myAccount', {
            url: '/myAccount',
            templateUrl: sta + 'html/my-account.html'
        })
        /*我的资产首页*/
        .state('main.myAccount.accountHome', {
            url: '/accountHome',
            templateUrl: sta + 'html/account-home.html'
        }) 
        /*我的投资*/
        .state('main.myAccount.myInvest', {
            url: '/myInvest',
            templateUrl: sta + 'html/account-myInvest.html'
        })
        /*我的投资明细*/
        .state('main.myAccount.investDetail', {
            url: '/investDetail?id&idx',
            templateUrl: sta + 'html/account-investdetail.html'
        })
        /*资产记录*/
        .state('main.myAccount.myAssets', {
            url: '/myAssets',
            templateUrl: sta + 'html/account-myAssets.html'
        }) 
        /*资金管理-充值*/
        .state('main.myAccount.recharge', {
            url: '/recharge',
            templateUrl: sta + 'html/account-recharge.html'
        })
        /*资金管理-充值*/
        .state('main.myAccount.rechargeSuccess', {
            url: '/rechargeSuccess',
            templateUrl: sta + 'html/account-recharge-success.html'
        })
        /*资金管理-提现*/
        .state('main.myAccount.Withdraw', {
            url: '/Withdraw',
            templateUrl: sta + 'html/account-Withdraw.html'
        })
        /*账户管理-个人中心*/
        .state('main.myAccount.person', {
            url: '/person',
            templateUrl: sta + 'html/account-person.html'
        })
        /*账户管理-安全认证*/
        .state('main.myAccount.security', {
            url: '/security',
            templateUrl: sta + 'html/account-security.html'
        })
        /*账户管理-存管账户*/
        .state('main.myAccount.storageinfo', {
            url: '/storageinfo',
            templateUrl: sta + 'html/account-storageinfo.html'
        })
        /* 开通存管 */
        .state('main.myAccount.openStorage', {
            url: '/openStorage',
            templateUrl: sta + 'html/account-storage.html'
        })
        /* 存管开通成功 */
        .state('main.myAccount.storageSuccess', {
            url: '/storageSuccess?success',
            templateUrl: sta + 'html/account-storage-success.html'
        })
        /*账户管理-银行卡*/
        .state('main.myAccount.bankCard', {
            url: '/bankCard',
            templateUrl: sta + 'html/account-bankCard.html'
        })
        /*优惠券-我的优惠券*/
        .state('main.myAccount.myCoupon', {
            url: '/myCoupon',
            templateUrl: sta + 'html/account-myCoupon.html'
        })
        /*优惠券-我的优惠券*/
        .state('main.myAccount.myFinance', {
            url: '/myFinance',
            templateUrl: sta + 'html/account-myFinance.html'
        })
         /*消息-我的消息*/
        .state('main.myAccount.myMsg', {
            url: '/myMsg',
            templateUrl: sta + 'html/account-myMsg.html'
        })
        /*我的好友*/
        .state('main.myAccount.myFriend', {
            url: '/myFriend',
            templateUrl: sta + 'html/account-friend.html'
        })
        /*活动中心-中奖记录*/
        .state('main.myAccount.winningRecord', {
            url: '/winningRecord',
            templateUrl: sta + 'html/account-winningRecord.html',
            controller:'winningRecordCtrl'
        })
        /*帮助*/
        .state('main.jt', {
            url: '/jt',
            templateUrl: sta + 'html/jt.html'
        })
        /*wqq---帮助*/
        .state('main.jt2', {
            url: '/jt2',
            templateUrl: sta + 'html/jt2.html'
        })
        /*wqq---帮助*/
        .state('main.jt2.help', {
            url: '/help',
            templateUrl: sta + 'html/jt/helps.html'
        })

         /*wqq---帮助*/
        .state('main.jt2.YHCG', {
            url: '/YHCG',
            templateUrl: sta + 'html/jt/YHCG.html'
        })

        /*菠菜概况*/
        .state('main.jt.JSGK', {
            url: '/JSGK',
            templateUrl: sta + 'html/jt/JSGK.html',
            controller:'jtContCtrl'
        })
        /*公司资质*/
        .state('main.jt.GSZZ', {
            url: '/GSZZ',
            templateUrl: sta + 'html/jt/GSZZ.html',
            controller:'jtContCtrl'
        })
        /*联系我们*/
        .state('main.jt.LXWM', {
            url: '/LXWM',
            templateUrl: sta + 'html/jt/LXWM.html',
            controller:'jtContCtrl'
        })
        /*多重保障*/
        .state('main.jt.YYYZ', {
            url: '/YYYZ',
            templateUrl: sta + 'html/jt/YYYZ.html',
            controller:'jtContCtrl'
        })
        /*公司公告*/
        .state('main.jt.GSGG', {
            url: '/GSGG',
            templateUrl: sta + 'html/jt/GSGG.html'
        })
        .state('main.jt.GGXQ', {
            url: '/GGXQ?newId',
            templateUrl: sta + 'html/jt/GGXQ.html'
        })
        // 团队
        .state('main.jt.GLTD', {
            url: '/GLTD',
            templateUrl: sta + 'html/jt/GLTD.html',
            controller:'jtContCtrl'
        })

        /*公司新闻详情*/
        .state('main.jt.XWXQ', {
            url: '/XWXQ?newId&t',
            templateUrl: sta + 'html/jt/XWXQ.html'
        })
        /*公司动态*/
        .state('main.jt.GSDT', {
            url: '/GSDT',
            templateUrl: sta + 'html/jt/GSDT.html'
        })
        /* 支付额度 */
        .state('main.jt2.ZFED', {
            url: '/ZFED',
            templateUrl: sta + 'html/jt/ZFED.html'
        })
        /* 银联开通 */
        .state('main.jt2.YLKT', {
            url: '/YLKT',
            templateUrl: sta + 'html/jt/YLKT.html'
        })
        /*菠菜理财注册协议*/
        .state('registration', {
            url: '/registration',
            templateUrl: sta + 'html/protocol/registration.html'
        })
        /*借款协议*/
        .state('loan', {
            url: '/loan?idx&pid&uid&investId',
            templateUrl: sta + 'html/protocol/loan.html'
        })
        /*借款协议*/
        .state('storage', {
            url: '/storage',
            templateUrl: sta + 'html/protocol/storage.html'
        })
        /*APP支付协议*/
        .state('pay', {
            url: '/pay',
            templateUrl: sta + 'html/protocol/pay.html'
        })
        /*安全保障*/
        .state('main.guarantee', {
            url: '/guarantee',
            templateUrl: sta + 'html/guarantee.html'
        })
        /* 没有导航的结构 */
        .state('extend', {
            url: '/extend',
            templateUrl: sta + 'html/activity/extend.html'
        })

        /* 新手指引 */
        .state('main.guide', {
            url: '/guide',
            templateUrl: sta + 'html/guide.html'
        })

        /* 新手专享-成功页 */
        .state('main.newhandSuccess', {
            url: '/newhandSuccess?nowNum',
            templateUrl: sta + 'html/newhand-success.html'
        })
        /* 体验标 */
        .state('main.financeDetail', {
            url: '/financeDetail',
            templateUrl: sta + 'html/finance-detail.html'
        })

        /* 体验金注册成功 */
        .state('main.financeSuccess', {
            url: '/financeSuccess?num',
            templateUrl: sta + 'html/activity/finance-success.html'
        })
        /* 体验金 */
        .state('regfinance', {
            url: '/regfinance',
            templateUrl: sta + 'html/reg/finance.html'
        })

        /* 法律法规 */
        .state('main.FLFG', {
            url: '/FLFG',
            templateUrl: sta + 'html/jt/FLFG.html'
        })
        
        /*邀请好友活动*/
        .state('extend.invite', {
            url: '/invite?toFrom&tid&recommCode',
            templateUrl: sta + 'html/activity/invite.html'
        })
        /*大转盘活动 Luck draw*/
        .state('main.luckDraw', {
            url: '/luckDraw',
            templateUrl: sta + 'html/login/luckDraw.html'
        })
        
        
        //test.html路由测试by:ts
        .state('main.RouterTest',{
        	url:'/test',
        	templateUrl:sta+'html/test.html'
        })
}]);

