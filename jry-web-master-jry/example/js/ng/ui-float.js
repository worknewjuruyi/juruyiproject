routerApp.directive('floatMenu', function() {
    return {
        restrict: "E",
        scope: true,
        template: ['<div class="float-window">',
            '<div class="float-mod" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)">',
            '<div class="absolute text">工作日：9:00 - 21:00<br />周末及节假日：9:00 - 18:00</div>',
            '<div><div class="float-ico zxkf"></div>',
            '<div class="float-text"><a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODE1NzM1MF80NDQ5NDJfNDAwNjcxNzcxMV8yXw">在线<br />客服</a></div></div>',
            '</div>',
            '<div class="float-mod" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)">',
            '<img class="absolute" src="images/weixincode.jpg" />',
            '<div><div class="float-ico weixin"></div>',
            '<div class="float-text">微信<br />扫码</div></div>',
            '</div>',
            '<div class="float-mod" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)">',
            '<img class="absolute" src="images/appcode.png" />',
            '<div><div class="float-ico app"></div>',
            '<div class="float-text">下载<br />APP</div></div>',
            '</div>',
            '<div class="float-mod cal-mod" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)" ng-click="showTotalCal()">',
            '<div><div class="float-ico cal"></div>',
            '<div class="float-text">收益<br />计算</div></div>',
            '</div>',
            '<div ng-if="(a | isRegister).register" class="float-mod msg-mod" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)" ng-click="showMsg()">',
            '<div><div class="float-ico msg"></div>',
            '<div class="float-text msg"></div></div>',
            '</div>',
            '<div class="float-mod up" ng-click="goTop()" ng-mouseenter="enter($event)" ng-mouseleave="leave($event)">',
            '<div><div class="float-ico top"></div>',
            '<div class="float-text">返回<br />顶部</div></div>',
            '</div>',
            '</div>'
        ].join(""),
        link: function(scope, element, attr) {
            scope.enter = function(e) {
                var obj = $(e.currentTarget);
                obj.find('.float-ico').stop().animate({ 'margin-top': -45 }, 150);
                e.stopPropagation();
                e.isDefaultPrevented();
                e.preventDefault();
            };
            scope.leave = function(e) {
                var obj = $(e.currentTarget);
                obj.find('.float-ico').stop().animate({ 'margin-top': 0 }, 150);
                e.stopPropagation();
                e.isDefaultPrevented();
                e.preventDefault();
            };
            scope.goTop = function() {
                $('html,body').animate({ scrollTop: 0 }, 500);
            };
            var $window = $(window),
                $up = element.find('.up');
            $window.on('load scroll', function() {
                var scrollTop = $window.scrollTop();
                if (scrollTop > 200) {
                    $up.show();
                } else {
                    $up.hide();
                }
            });
        },
        controller:[
            '$scope',
            '$filter',
            'ngDialog',
            '$localStorage',
            'resourceService',
            function($scope,$filter,ngDialog,$localStorage,resourceService) {

                $scope.showMsg = function() {
                    $filter('意见弹窗')($scope);
                };
                $scope.subDialog = function() {
                    var value = $('#opinion').val();
                    if (value == '') {
                        $('#opinion').focus();
                    } else {
                        var user = $localStorage.user;
                        resourceService.queryPost($scope, $filter('交互接口对照表')('意见反馈'), {
                            uid: user.uid,
                            content: value//,
                            // contactInformation: user.mobilephone
                        }, '意见反馈');
                    }
                };
                $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
                    switch (type) {
                        case "意见反馈":
                            ngDialog.closeAll();
                        break;
                    };
                });

                // 计算器
                $scope.showTotalCal = function() {
                    $filter('首页计算器弹窗')($scope);
                };

                $scope.changeDeadline = function(deadline) {
                    $scope.chooseDeadline = deadline;
                    switch(deadline) {
                        case 35:
                            $scope.chooseRate = 8.5;
                        break;
                        case 60:
                            $scope.chooseRate = 11.3;
                        break;
                        case 90:
                            $scope.chooseRate = 11.5;
                        break;
                        case 150:
                            $scope.chooseRate = 11.8;
                        break;
                        case 180:
                            $scope.chooseRate = 12;
                        break;
                        default:
                            $scope.chooseRate = '';
                        break;
                    }
                };
                $scope.storageReset = function(){
                    $scope.showDeadlineUl = false;
                    $scope.showTypeUl = false;
                    $scope.chooseDeadline = '';
                    $scope.chooseType = '';
                    $scope.calInvestNum = '';
                    $scope.chooseRate = '';
                    $scope.showResult = false;
                    $scope.errorMsg = '';
                    $scope.showError = false;
                    $('#calInvestNum').val('');
                    $('.numbox').removeClass('activebox');
                    $('.deadlinebox').removeClass('activebox');
                };
                $scope.storageReset();
                $scope.calNow = function() {
                    if ($('#calInvestNum').val() == '') {
                        $scope.errorMsg = '请输入投资金额';
                        $('.numbox').addClass('activebox');
                        $scope.showError = true;
                        return;
                    } else {
                        $('.numbox').removeClass('activebox');
                        if ($scope.chooseDeadline == '') {
                            $('.deadlinebox').addClass('activebox');
                            $scope.errorMsg = '请选择投资期限';
                            $scope.showError = true;
                            return;
                        } else {
                            $('.deadlinebox').removeClass('activebox');
                            $scope.showError = false;
                        }
                    }
                    if ($scope.chooseType == '' && $('#calInvestNum').val() != '' && $scope.chooseDeadline != '') {
                        $scope.chooseType = 'a';
                    }
                    $scope.showResult = true;
                };
            }
        ]
    }
})
