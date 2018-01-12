/* 
* @Author: lee
* @Date:   2016-01-23 10:37:01
* @Last Modified by:   lee
* @Last Modified time: 2016-01-23 19:16:49
*/

'use strict';

routerApp
    /*开发环境*/
    .filter('isOnLine', function () {
        return function () {
            var isOnLine = true;//fasle=静态调试；true=开发模式
            return isOnLine;
        }
    })
    /*清空缓存*/
    .filter('清空缓存', function ($localStorage) {
        return function () {
            if ($localStorage.pathUrl != undefined && $localStorage.pathUrl != 'main.home') {
                delete $localStorage.pathUrl;
            }
            delete $localStorage.user;
            if ($localStorage.promoteIsPayment != undefined) {
                delete $localStorage.promoteIsPayment;
            }
            if ($localStorage.showXiaoBiao != undefined) {
                delete $localStorage.showXiaoBiao;
            }
        }
    })
    /*开发环境*/
    .filter('isLinWidth', function () {
        return function (width) {
            // return 'width:'+width+'%';
            return 'WIDTH:50%';
        }
    })

    /*当前登录状态信息*/
    .filter('isRegister', function ($localStorage, $filter) {

        return function (name) {
            var obj = {};
            obj.register = false;
            obj.user = {};
            if ($localStorage.user != undefined) {
                obj.register = true;
                if ($localStorage.user.realName == '' || $localStorage.user.realName == undefined || $localStorage.user.realName == null) {
                    $localStorage.user.userName = '亲爱的用户';
                } else {
                    $localStorage.user.userName = $localStorage.user.realName;
                }
                obj.user = $localStorage.user;
            } else {
                obj.register = false;
                obj.user.userName = '亲爱的用户';
            }
            return obj;
        }
    })

    /*判断login头部*/
    .filter('isLoginPage', function ($rootScope) {
        return function (name) {
            if ($rootScope.title == "login") {
                return true;
            } else { return false; }
        }
    })

    /*根据用户状态提示跳转页面方向*/
    .filter('提示跳转', function (ngDialog) {
        return function (templateurl, scope) {
            ngDialog.open({
                template: templateurl,
                scope: scope,
                closeByDocument: true,
                plain: false
            });
            // return  dialog;
        };
    })

    /*投资确认弹窗*/
    .filter('投资确认弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/invest-dialog.html',
                scope: scope,
                closeByDocument: true,
                plain: false,
                className: 'invest-dialog-wrapper ngdialog-theme-default'
            });
        };
    })

    .filter('开户成功弹窗', function(ngDialog) {
        return function(scope) {
            ngDialog.open({
                template : '../js/ng/dialog/openaccount-dialog.html',
                scope : scope,
                plain : false,
                closeByDocument: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            
        };
    })

    .filter('投即送投资成功弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/investgift-dialog.html',
                scope: scope,
                closeByDocument: true,
                plain: false,
                className: 'invest-dialog-wrapper ngdialog-theme-default'
            });
        };
    })

    /*投资确认弹窗*/
    .filter('弹窗', function (ngDialog) {
        return function (scope, tpl) {
            ngDialog.open({
                template: tpl,
                scope: scope,
                closeByDocument: true,
                plain: false
            });
        };
    })

    /*广告弹窗*/
    .filter('广告弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '<a target="_blank" href="' + scope.popList.location + '" ng-click="closeAD()"><div style="width:840px;height:460px;"><img style="width:100%;height:100%;" src="' + scope.popList.imgUrl + '"><div></a>',
                scope: scope,
                closeByDocument: false,
                plain: true,
                animation: {
                    width: "100px",
                    height: "200px",
                    right: 0,
                    bottom: 0,
                    'margin-right': 0,
                    'margin-bottom': 0
                },
                className: 'ad-dialog-wrapper ngdialog-theme-default'
            });
            scope.$on('ngDialog.closing', function (e, $dialog) {
                $dialog.find('.ngdialog-overlay').fadeOut(200);
                $dialog.find('.donghua').animate({
                    width: "100px",
                    height: "200px",
                    right: 0,
                    bottom: 0,
                    'margin-right': 0,
                    'margin-bottom': 0
                }, 1000, function () {
                    $dialog.find('.donghua').fadeOut(200);
                })
            });
            // ngDialog.setPadding='0';
            scope.closeAD = function () {
                ngDialog.closeAll();
            };
        };
    })

    /*充值提现弹窗*/
    .filter('充值提现弹窗', function (ngDialog, $state, $localStorage) {//../js/ng/dialog/success-dialog.html
        return function (scope) {
            scope.status = $localStorage.dialogStatus;
            scope.type = $localStorage.dialogType;
            scope.msg = $localStorage.dialogMsg;
            switch (scope.status) {
                case 'success':
                    scope.text = '成功';
                    break;
                case 'ing':
                    scope.text = '处理中';
                    break;
                case 'error':
                    scope.text = '失败';
                    break;
            }
            if (scope.type === '充值' && scope.status == 'success') {
                scope.showLittleTip = true;
            } else {
                scope.showLittleTip = false;
            }
            scope.closeDialog = function (bool) {
                ngDialog.closeAll();
                if (!bool) {
                    if (scope.type === '充值') {
                        if (scope.status == 'success' || scope.status == 'ing') {
                            $state.go('main.myAccount.recharge', null, {
                                reload: true
                            });
                        } else if (scope.status == 'error') {
                            if (scope.recharge.errorCode != '1003') {
                                $state.go('main.myAccount.recharge', null, {
                                    reload: true
                                });
                            }
                        }
                        scope.isSubmit = false;
                    } else if (scope.type === '提现') {
                        $state.go('main.myAccount.Withdraw', null, {
                            reload: true
                        });
                    }
                }
            };
            scope.returnHome = function (bool) {
                ngDialog.closeAll();
                $state.go('main.myAccount.accountHome');
            };
            ngDialog.open({
                template: '../js/ng/dialog/success-dialog.html',
                scope: scope,
                closeByDocument: false,
                // plain : true,
                showClose: false
            });
            // return  dialog;
        };
    })
    /*充值弹窗*/
    .filter('充值弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/recharge-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false
            });
            // return  dialog;
        };
    })
    .filter('图片放大弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/bigimg-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false
            });
            // return  dialog;
        };
    })

    .filter('计算器弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/calculator-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'cal-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
        };
    })
    .filter('奖金弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/pop-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'pop-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
        };
    })
    .filter('微信二维码弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/code-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'pop-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
        };
    })

    .filter('红包弹窗', function (ngDialog, $state) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/redbag-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'redbag-dialog-wrapper ngdialog-theme-default'
            });
            scope.promoteGoCoupon = function () {
                ngDialog.closeAll();
                $state.go('main.myAccount.myCoupon');
            }
            scope.promoteCloseDialog = function () {
                ngDialog.closeAll();
            };
        };
    })

    .filter('预定弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/book-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'book-dialog-wrapper ngdialog-theme-default'
            });
        };
    })

    .filter('新手标弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/newhand-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'newhand-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
        };
    })
    .filter('体验金认证弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/finance-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default'
            });
            scope.closeDialog = function (type) {
                ngDialog.closeAll();
                if (type != undefined) {
                    $localStorage.activeText = { name: '我的福利', url: 'main.myAccount.' + type };
                }
            };
        };
    })

    .filter('体验金投资弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/financeInvest-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
        };
    })

    .filter('意见弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/msg-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
        };
    })

    .filter('银行卡选择弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/bank-dialog.html',
                scope: scope,
                closeByDocument: false,
                plain: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
        };
    })

    .filter('推广页注册弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/reg-dialog.html',
                scope: scope,
                closeByDocument: true,
                plain: false,
                className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
        };
    })

    .filter('推广页不注册弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/regnoget-dialog.html',
                scope: scope,
                closeByDocument: true,
                plain: false,
                className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
        };
    })

    .filter('不要体验金弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/goldnoact-dialog.html',
                scope: scope,
                // closeByDocument : true,
                plain: false,
                className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
            scope.goGoldACT = function () {
                ngDialog.closeAll();
                scope.goldACT = true;
                scope.product.nowNum = 5000;
            };

        };
    })

    .filter('提现跳转弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/withdraw-dialog.html',
                scope: scope,
                plain: false,
                closeByDocument: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });

        };
    })

    .filter('投资余额不足弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/nomoney-dialog.html',
                scope: scope,
                plain: false,
                closeByDocument: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });

        };
    })

    .filter('首页计算器弹窗', function (ngDialog) {
        return function (scope) {
            ngDialog.open({
                template: '../js/ng/dialog/totalcal-dialog.html',
                scope: scope,
                plain: false,
                closeByDocument: false,
                className: 'christmas-dialog-wrapper ngdialog-theme-default',
                showClose: false
            });
            scope.closeDialog = function () {
                ngDialog.closeAll();
            };
        };
    })


    /**
        当点击投资时要判断当前用登录状态并决定页面跳转到哪里
    */
    .filter('clickTouZiGotoWhere', function ($localStorage, $filter, communicationService, $state) {

        return function (scope, myUrl) {
            var url;
            scope.msg = {};
            if ($filter('isRegister')().register) {//如果已登录
                url = myUrl;
            } else {//未登录
                communicationService.setTagPage('denLu', 'main.home');
                url = 'main.loginPage';
            };
            $state.go(url);
        }
    })

    /*跳转去登录*/
    .filter('跳转页面', function ($rootScope, communicationService, $state, $localStorage) {
        /*
            type:登录或注册状态,
            path:出自,
            url：要去,
            item：产品信息,
            pathMenu,按钮名,
            activeText：按钮选择的状态name:上级按钮名url:子集按钮路径
        */
        return function (type, path, url, item, pathMenu, activeText) {
            if (item != undefined) {
                $localStorage.product = item;
                communicationService.setProduct(item);
            };
            $localStorage.pathObj = [{ pathName: '首页', url: '/mainhome' }];
            if (pathMenu != undefined || pathMenu != null) {
                $localStorage.pathObj.push(pathMenu);
            }
            $localStorage.pathUrl = path;

            // 跳转到我的账户里边左边栏显示
            if (activeText == undefined) {
                $localStorage.activeText = { name: '我的账户', url: 'main.myAccount.accountHome' };
            } else {
                $rootScope.$broadcast('myEvent.WHDR_Ctrl', activeText);
                $localStorage.activeText = activeText;
            }
            communicationService.setTagPage(type, path);
            if (item != undefined) {
                $state.go(url, item.id);
            } else {
                $state.go(url);
            };
        }
    })
    /*跳回上一页*/
    .filter('跳回上一页', function ($localStorage, $state) {

        return function (type, path) {

            if ($localStorage.pathUrl != undefined && $localStorage.pathUrl != '') {
                if ($localStorage.product != undefined) {
                    $state.go($localStorage.pathUrl, { id: $localStorage.product.id });
                } else {
                    $state.go($localStorage.pathUrl);
                }
                // delete $localStorage.pathUrl;
            } else {
                $state.go('main.home');
            }
        }
    })
    /* 数字转为两位小数 */
    .filter('changeTwoDecimal', function () {

        return function (x) {
            var f_x = parseFloat(x);
            if (isNaN(f_x)) {
                return;
            }
            var f_x = Math.round(x * 100) / 100;
            var s_x = f_x.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            if (s_x == '0.00') {
                return '';
            }
            return s_x;
        }
    })

    /*跳回上一页*/
    .filter('60秒倒计时', function ($timeout) {

        return function (scope, timeNum) {
            scope.nowTimer = '';
            var timer;
            var nowTimer = timeNum;
            if (scope.isSubMin) {
                setTimerOut();
            }
            function setTimerOut() {
                timer = $timeout(
                    function () {
                        if (nowTimer <= 0) {
                            scope.nowTimer = '';
                            scope.disabledPhoneBtn = false;
                            scope.isSubMin = true;
                            scope.isGetVoice = false;
                            scope.isGetCode = false;
                            scope.bool = true;
                            // if ($('.img-box img')[0] != undefined) {
                            //     $('.img-box img')[0].src += '?' + new Date().getTime();
                            // }
                            if (scope.changeIMGCode != undefined) {
                                scope.changeIMGCode();
                            }
                        } else {
                            if (scope.isvoice) {
                                scope.isSubMin = false;
                            }
                            nowTimer -= 1;
                            scope.nowTimer = nowTimer + 's';
                            setTimerOut();
                        }
                    },
                    1000
                );
            };
            scope.stop = function () {
                nowTimer = 0;
                scope.isGetVoice = false;
                scope.bool = false;
            };
        }
    })
    /*跳回上一页　　　*/
    .filter('300秒倒计时', function ($timeout) {

        return function (scope, timeNum, isOverBool) {
            scope.nowTimer = '';
            var timer;
            var nowTimer = timeNum;
            // var isOverBool=true;
            if (isOverBool) {
                setTimerOut();
            }
            function setTimerOut() {
                timer = $timeout(
                    function () {
                        if (isOverBool) {
                            if (nowTimer <= 0) {
                                scope.nowTimer = '短信验证失效';
                                scope.isDisabledPhoneMsg = true;
                                scope.disabledPhoneBtn = true;
                                if (scope.changeIMGCode != undefined) {
                                    scope.changeIMGCode();
                                };

                            } else {
                                nowTimer -= 1;
                                setTimerOut();
                            }
                        }
                    },
                    1000
                );
            };
            scope.stopmsmTimerout = function () {
                isOverBool = false;
            };
        }
    })

    /*跳回上一页*/
    .filter('6秒倒计时自动跳转', function ($timeout, $filter) {

        return function (scope, timeNum) {
            scope.nowTimerGoto = '';
            var nowTimer = timeNum;
            setTimerOut();
            var isBool = true;
            scope.stopTimerout = function () {
                isBool = false;
            };
            function setTimerOut() {
                var timer = $timeout(
                    function () {
                        if (nowTimer <= 0) {
                            if (isBool) {
                                $filter('跳转页面')('', 'main.home', 'main.home');
                            }
                        } else {
                            nowTimer -= 1;
                            scope.nowTimerGoto = nowTimer + 's ';
                            setTimerOut();
                        }
                    },
                    1000
                );
            };
        }
    })

    /*路由状态*/
    .filter('isLogin', function ($rootScope, $location, communicationService) {

        return function (scope) {
            switch ($location.$$url) {
                case "/mainloginPage":
                    if (communicationService.getTagPage().url == undefined) {
                        communicationService.setTagPage('denLu', 'main.home');
                    };
                    $rootScope.title = "菠菜理财欢迎您！";
                    $rootScope.isLoginPage = true;
                    break;
                case "/mainresetPasswd":
                    $rootScope.title = "修改密码";
                    $rootScope.isLoginPage = true;
                    break;
                case "/maintradepasswdSet":
                    $rootScope.title = "实名认证";
                    $rootScope.isLoginPage = true;
                    break;
                case "/mainbankBillList":
                    scope.path = [{ pathName: '首页', url: '/mainhome' }, { pathName: '优选理财', url: '/mainbankBillList' }];
                    $rootScope.title = "菠菜-优选理财";
                    $rootScope.isLoginPage = false;
                    break;
                case "/mainYbankBillList":
                    scope.path = [{ pathName: '首页', url: '/mainhome' }, { pathName: '票据优选', url: '/mainYbankBillList' }];
                    $rootScope.title = "菠菜-优选理财";
                    $rootScope.isLoginPage = false;
                    break;
                case "/mainbillDetail":
                    scope.path = [{ pathName: '首页', url: '/mainhome' }, { pathName: '票据优选', url: '/mainYbankBillList' }];
                    $rootScope.title = "菠菜-理财详情";
                    $rootScope.isLoginPage = false;
                    break;
                case "/mainmyAccountaccountHome":
                    $rootScope.title = "菠菜-我的资产";
                    $rootScope.isLoginPage = false;
                    break;
                default:
                    $rootScope.isLoginPage = false;
                    break;
            }
        }
    })

    /*接口对照表*/
    .filter('交互接口对照表', function () {

        return function (name) {
            var base = '/'
            var portUrlMap = {
                '登录接口': base + "doLogin",
                '退出接口': base + "exit",

                /*登录注册*/
                '注册验证手机号': base + 'existMobilePhone',
                '校验图片验证码': base + 'sendRegMsg',
                '立即注册': base + 'reg',
                '修改用户密码-手机验证': base + 'forgetPwdSmsCode',
                '修改用户密码-提交手机验证': base + 'validateSmsCode',
                '修改用户密码-提交密码': base + 'updatePwd',

                /*首页Home*/
                'Home主数据': base + 'indexMemberInfo',
                '产品列表': base + 'indexProduct',
                'banner': base + 'banner',
                '公司新闻': base+'indexArticle',
                '投资统计数据': base+'regAndInvestCount',
                '实时投资记录': base+'indexInvestLogs',

                /*票据优选*/
                '票据优选列表': base+'productList',

                /*票据安选*/
                '票据列表': base+'productList',

                /*产品详情页*/
                '票据详情': base+'detail',
                '确认投资': base+'invest',
                '投资记录': base+'depositsHistory',

                /*我的资产首页*/
                '我的资产首页数据': base+'info',
                '我的投资': base+'investStat',
                '我的投资明细': base+'investCenter/repayInfoDetail.do',
                '我的投资-收益中的产品': base+'investCenter/productList.do',
                // '我的投资-已到期产品' :'expireProductList',
                '我的投资-资产记录': base+'assetRecord',


                /*实名认证*/
                'test': base+'listAx',

                /* 身份认证 */
                '身份认证': base+'bankInfoVerify',
                '身份认证获取短信验证码': base+'sendBankMsg',

                /* 安全认证 */
                '安全认证数据': base+'memberSetting',
                '安全认证修改登录密码': base+'updateLoginPassWord',

                /* 设置交易密码 */
                '设置交易密码': base+'setTpwd',

                /* 修改交易密码 */
                '修改交易密码': base+'updateTpwd',

                /* 找回交易密码获取短信验证码 */
                '找回交易密码获取短信验证码': base+'sendForgetTpwdCode',

                /* 找回交易密码验证短信验证码 */
                '找回交易密码验证短信验证码': base+'validateTpwdCode',

                /* 找回交易密码设置新交易密码 */
                '找回交易密码设置新交易密码': base+'updateTpwdBySms',

                /* 充值提现数据 */
                '充值数据': base+'recharge',
                '提现数据': base+'withdrawals',

                /* 充值 */
                '创建充值订单': base+'createPayOrder',
                '充值': base+'goPay',
                '充值获取验证码': base+'sendRechargeSms',
                '网银充值': base+'recharge/goFuiouWYPay.do',
                '充值成功数据': base+'rechargeSuccess',

                /* 提现 */
                '提现': base+'addWithdrawals',

                /* 我的消息 */
                '我的消息': base+'myMessage',
                '消息列表': base+'getMessage',
                '标记消息为已读': base+'updateUnReadMsg',

                /* 个人中心 */
                '个人中心': base+'personInfo',

                /* 优惠券 */
                '用户可用优惠券': base+'usable',
                '我的优惠券': base+'activity',

                /* 我的好友 */
                '我的好友': base+'myRecommend',

                /* 新闻列表 */
                '新闻列表': base+'newsInformationList',
                '新闻详情': base+'newsDetails',

                //    下一篇 上一篇
                "下一页": base+'aboutus/nextPageNews.do',
                "上一页": base+'aboutus/previousPageNews.do',

                /* 权益转让及受让协议 */
                '权益转让及受让协议': base+'agreement',
                /* 借款协议 */
                '借款协议': base+'borrow',
                /* 债权转让协议 */
                '债权转让协议': base+'transfer',

                '好友互推列表': base+'recommend/myFriendInvest.do',
                'selectInvest': base+'product/selectInvest.do',
                // 好友邀请
                '查询邀请活动信息': base+'activity/getActivityFriendConfig.do',
                '获取邀请手机号': base+'activity/getMobilePhoneByRecommCode.do',
                '邀请好友统计': base+'activity/getActivityFriendStatistics.do',
                '邀请活动列表': base+'activity/getActivityFriendConfigAll.do',
                '领取奖金': base+'assetRecord/getTheRewards.do',

                //活动  查看抽奖的次数
                '抽奖次数': base+'activityLottery/getLotteryNum.do',
                '转盘': base+'activityLottery/getLotteryPriz.do',
                '十个中奖记录': base+'activityLottery/queryAwardAll.do',
                '我的奖品': base+'activityLottery/queryAward.do.do',


                '获取首页广告': base+'index/advertisement.do',

                '获取复投红包': base+'member/getPromoteRedelivery.do',
                '获取变现产品': base+'member/getUse.do',
                '我的好友邀请': base+'activity/myInvitation.do',

                '新手标领取现金': base+'product/getContinueReward.do',

                '体验标详情': base+'product/experienceDetail.do',
                '体验标投资': base+'product/experienceInvest.do',
                '意见反馈': base+'system/feedback.do',
                '认证支持银行列表': base+'memberSetting/selectBank.do',

                '存管信息': 'member/openAccountSignature.do',
                '存管快捷充值': 'recharge/depositsRecharge.do',
                '存管提现': 'withdrawals/depositsWithdrawals.do',
                '存管账户信息': 'memberSetting/fuiouIndex.do',
                '修改存管交易密码': 'memberSetting/fuiouUpdatePwd.do',

                '存管开户直连': 'member/openAccount.do',
                '充值验证码直连': 'recharge/fuiouSendSms.do',
                '存管充值直连': 'recharge/fuiouFastRecharg.do',
                '存管网银充值': 'recharge/onlineBankingRecharge.do',
                
                '注册送体验机红包是否激活': base+'activity/getCouponIsActivation.do',

                '活动页账户信息': base+'activity/getMyAccount.do',

                '获取产品详情页': base+'product/selectPorductClassifyByDeadline.do',
                'end': base+'end',
                'invest': base+'product/invest.do',
                '三重礼排行榜': 'activity/getRankingList.do',
            };

            return portUrlMap[name];
        }
    })

    /*静态json*/
    .filter('静态接口对照表', function () {

        return function (name) {
            var portUrlMap = {
                '弹出框模板': "js/ng/dialog/msgGoLogin.html",
                /*帮助-常见问题*/
                '常见问题': "/data/helps.json",
                '存管问题': 'data/storage.json',
                '理财知识': "/data/lczs.json",
                'end': 'end'
            };

            return portUrlMap[name];
        }
    })
