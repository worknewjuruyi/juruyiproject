//暂无controller对应
define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('setDepositoryController', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
        $rootScope.title = "开通账户";
        $filter('isPath')('setDepository');
        var jsonUrl='/data/ProvinceAndCity.json';
        resourceService.getJsonServer($scope,jsonUrl,{},'静态文本_菜单');
        $scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
            switch(type) {
                case "静态文本_菜单":
                    $scope.cityList = data.result;
                break;
            }
        });
        var user = $filter('isRegister')();
        if(user.register){
            $scope.userForm = {};
            $scope.userForm.uid = user.user.member.uid;
            $scope.userForm.mobile_no = user.user.member.mobilephone;
        }
        else{
            $state.go('login');
        }
        resourceService.queryPost($scope, $filter('getUrl')('我的信息'), {
            uid: $scope.userForm.uid
        }, {name:'我的信息'});
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch (type.name) {
                case '存管开户':
                    if (data.success) {
                        ngDialog.open({
                            template: '<p class="error-msg">开通账户成功！</p>',
                            showClose: false,
                            closeByDocument: false,
                            plain: true
                        });
                        setTimeout(function() {
                            ngDialog.closeAll();
                            $state.go('main.myaccountHome');
                        }, 2000);
                    } 
                    else{
                        if(data.errorMsg){
                            $rootScope.errorText = data.errorMsg;
                        }
                        else{
                            $rootScope.errorText = '开户遇到问题，请核对您填写的信息是否正确';
                        }
                        $rootScope.maskError = true;
                    }
                    $scope.userForm.password = '';
                    $scope.userForm.rpassword = '';
                    break;
                case '我的信息':
                    if (data.success) {
                        $scope.userData = data.map;
                        $scope.userForm.cust_nm = data.map.realName;
                        $scope.userForm.certif_id = data.map.idCards;
                    }
                    break;
            };
        });
        $scope.changeToggle = function(event){
            $(event.currentTarget).parent('div').find('main').finish().slideToggle();
            if($(event.currentTarget).find('i').hasClass('animation1')){
                $(event.currentTarget).find('i').removeClass('animation1').addClass('animation2');
            }
            else if($(event.currentTarget).find('i').hasClass('animation2')){
                $(event.currentTarget).find('i').removeClass('animation2').addClass('animation1');
            }
            else if($(event.currentTarget).find('i').hasClass('init')){
                $(event.currentTarget).find('i').removeClass('init').addClass('animation2');
            }
            else{
                $(event.currentTarget).find('i').addClass('animation1');
            }
        }
        $scope.toback = function () {
            $filter('跳回上一页')(2);
        };
        $scope.onClick = function () {
            ngDialog.closeAll();
        };
        $scope.submit = function (tegForm) {
            if (tegForm.$valid==false) {
                if(tegForm.name.$error.required==true){
                    $rootScope.errorText = '姓名不能为空';
                    $rootScope.maskError = true;
                }
                else if(tegForm.idCards.$valid==false){
                    $rootScope.errorText = '请输入正确的身份证号码';
                    $rootScope.maskError = true;
                }
                else if(tegForm.bankName.$error.required==true){
                    $rootScope.errorText = '请选择开户行';
                    $rootScope.maskError = true;
                }
                else if(tegForm.capAcntNo.$valid==false){
                    $rootScope.errorText = '请输入正确的银行卡号码';
                    $rootScope.maskError = true;
                }
                else if(tegForm.select_province.$error.required==true || tegForm.city_id.$error.required==true){
                    $rootScope.errorText = '请选择开户所在地';
                    $rootScope.maskError = true;
                }
                else if(tegForm.password.$valid==false){
                    $rootScope.errorText = '请输入规则的密码';
                    $rootScope.maskError = true;
                }
                else if($scope.userForm.password != $scope.userForm.rpassword) {
                    $rootScope.errorText = '交易密码输入不一致';
                    $rootScope.maskError = true;
                }
            }
            else if($scope.userForm.password != $scope.userForm.rpassword) {
                $rootScope.errorText = '交易密码输入不一致';
                $rootScope.maskError = true;
            }
            else{
                $scope.userForm.password = md5.createHash($scope.userForm.password);
                $scope.userForm.rpassword = md5.createHash($scope.userForm.rpassword);
                resourceService.queryPost($scope, $filter('getUrl')('存管开户'), $scope.userForm, { name: '存管开户', tegForm: tegForm });
            }
        }
        $scope.changeProvince = function(){
            $scope.userForm.city_id = undefined;
        }
        $scope.bankList = [
            {code: '0102',bankName:'中国工商银行'},
            {code: '0103',bankName:'中国农业银行'},
            {code: '0104',bankName:'中国银行'},
            {code: '0105',bankName:'中国建设银行'},
            {code: '0301',bankName:'交通银行'},
            {code: '0302',bankName:'中信银行'},
            {code: '0303',bankName:'中国光大银行'},
            {code: '0304',bankName:'华夏银行'},
            {code: '0305',bankName:'中国民生银行'},
            {code: '0306',bankName:'广东发展银行'},
            {code: '0307',bankName:'平安银行股份有限公司'},
            {code: '0308',bankName:'招商银行'},
            {code: '0309',bankName:'兴业银行'},
            {code: '0310',bankName:'上海浦东发展银行'},
            {code: '0403',bankName:'中国邮政储蓄银行股份有限公司'},
        ]
    })
})
