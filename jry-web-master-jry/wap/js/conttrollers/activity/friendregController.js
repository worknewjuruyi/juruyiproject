define(['jweixin', 'js/module.js', 'jquery', 'ngdialog', 'SHR256'], function (wx, controllers, $, ngdialog, SHR256, weixin) {
    controllers.controller('friendregController', function ($scope, $rootScope, resourceService, $filter, $state, ngDialog, $location, md5, $localStorage, $stateParams,signWeChatService) {
        signWeChatService();
        $rootScope.title = '菠菜理财';
        $scope.login = {};
        if ($localStorage.webFormPath != undefined) {
            if ($localStorage.webFormPath.recommCode != undefined) {
                $scope.login.recommPhone = $localStorage.webFormPath.recommCode;
            };
            if ($localStorage.webFormPath.toFrom != undefined) {
                $scope.login.toFrom = $localStorage.webFormPath.toFrom;
            };
            if ($localStorage.webFormPath.tid != undefined) {
                $scope.login.tid = $localStorage.webFormPath.tid;
            };
        };
        $scope.webFormPath = $localStorage.webFormPath;
        if ($location.$$search) { $scope.webFormPath = $location.$$search; }

        if ($scope.webFormPath.toFrom != undefined) {
            $scope.login.toFrom = $scope.webFormPath.toFrom;
        }
        if ($scope.webFormPath.recommCode != undefined) {
            $scope.login.recommPhone = $scope.webFormPath.recommCode;
        }
        if ($scope.webFormPath.tid != undefined) {
            $scope.login.tid = $scope.webFormPath.tid;
        }
        if ($stateParams.myToFrom != '' && $stateParams.myToFrom != null) {
            $scope.login.toFrom = $stateParams.myToFrom;
        }
        if ($stateParams.maskType != '' || $stateParams.maskType != undefined) {
            $localStorage.maskType = $stateParams.maskType;
        }
        // 图形验证码
        var changeIMG = function (event) { //换图片验证码
            if (event != undefined) {
                event.currentTarget.src += '?' + new Date().getTime();
            } else {
                if ($('.img-box img')[0] != undefined) {
                    $('.img-box img')[0].src += '?' + new Date().getTime();
                }
            }
        };
        changeIMG();
        $scope.clickInput = function (event) {
            changePicEvent = event;
            changeIMG(changePicEvent);
        };

        $scope.passwordText = false;
        $scope.isSubMin = true;
        $scope.nowTimer = "获取验证码";
        var changePicEvent;
        var targetFrom;
        if ($location.$$search.frompc) { $scope.frompc = $location.$$search.frompc; }
        var isSub = true;
        $scope.isImgCode = true;
        $scope.zuce = function (tegForm) {
            $scope.login.checkbox = true;
            if ($scope.login.recommPhone === undefined) {
                delete $scope.login.recommPhone;
            };
            if ($scope.login.toFrom === undefined) {
                delete $scope.login.toFrom;
            };
            if (tegForm.$valid) {
                if ($scope.login.passWord.length > 5) {
                    if (isSub) {
                        isSub = false;
                        resourceService.queryPost($scope, $filter('getUrl')('zuce'), $scope.login, { name: '注册', tegForm: tegForm });
                    }
                }
            } else {
                $rootScope.errorText = '请正确填写以上信息';
                $rootScope.maskError = true;
            }
        }
        $scope.getyzm = function (tegForm) {
            if ($scope.isSubMin == true) {
                if($scope.isImgCode==true){
                    if (tegForm.mobilephone.$error.required == true) {
                        $rootScope.errorText = '请输入需验证的手机号码';
                        $rootScope.maskError = true;
                    }
                    else if (tegForm.mobilephone.$valid == false) {
                        $rootScope.errorText = '请输入正确的手机号码';
                        $rootScope.maskError = true;
                    }
                    else if (tegForm.picCode.$error.required == true) {
                        $rootScope.errorText = '请输入图形码';
                        $rootScope.maskError = true;
                    }
                    else if (tegForm.picCode.$valid == false) {
                        $rootScope.errorText = '请输入正确的图形码';
                        $rootScope.maskError = true;
                    }
                    else if($scope.existPhone == true){
                        $rootScope.errorText = '此手机已注册';
                        $rootScope.maskError = true;
                    }
                    else {
                        resourceService.queryPost($scope, $filter('getUrl')('getyzm'), {
                            mobilephone: $scope.login.mobilephone,
                            picCode: $scope.login.picCode,
                            isPic : true
                        }, { name: '获取验证码', tegForm: tegForm });
                    }
                }
                else{
                    $scope.login.picCode = '';
                    $scope.isImgCode=true;
                    changeIMG();
                    $rootScope.errorText = '请重新输入图形码';
                    $rootScope.maskError = true;
                }
            }
        };
        /*焦点进入与离开*/
        $scope.blurID = function (code, tegForm) {
            if (!tegForm.mobilephone.$error.required && !tegForm.mobilephone.$error.minlength && !tegForm.mobilephone.$error.pattern) {
                resourceService.queryPost($scope, $filter('getUrl')('getPhone'), {
                    mobilephone: $scope.login.mobilephone
                }, { name: '注册验证手机号', tegForm: tegForm });
            };
            changeIMG();
        };
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch (type.name) {
                case '获取验证码':
                    if (data.success==true) {
                        $filter('60秒倒计时')($scope, 120);
                        $scope.isImgCode=false;
                        $rootScope.errorText = '验证码发送成功';
                        $rootScope.maskError = true;
                    } else if(data.errorCode == '1006'){
                        $rootScope.errorText = data.errorMsg;
                        $rootScope.maskError = true;
                    } else {
                        // $scope.stop();
                        $filter('手机短信验证错误')(type.tegForm, data.errorCode);
                    }
                    break;
                case '注册验证手机号':
                    if (data.success) {
                        if (data.map.exists) { //已有用户名
                            $rootScope.errorText = '此手机已注册';
                            $rootScope.maskError = true;
                            $scope.existPhone = true;
                        }
                        else{
                            $scope.existPhone = false;
                        }
                    }
                    break;
                case '注册':
                    isSub = true;
                    if (data.success) {
                        $localStorage.user = data.map;
                        $state.go('regSuccess');
                    } else {
                        $filter('serverZuceError')(type.tegForm, data.errorCode);
                        $scope.login.passWord = '';
                    };
                    break;
            };
        });
    })
})
