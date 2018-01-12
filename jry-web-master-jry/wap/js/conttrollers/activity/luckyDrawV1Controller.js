define(['js/module.js', 'jquery', 'framework/jquery.scrollbox.js'], function(controllers, $) {
    'use strict';
    controllers.controller("luckyDrawV1",["$scope", "$stateParams", "$filter", "$timeout", "$state", "resourceService",function($scope,$stateParams,$filter,$timeout,$state,resourceService){
        
        //获取十个用户抽奖纪录
        $scope.usersLuckList = [];//十个用户抽奖纪录
        $scope.myPrizeList = [];//我的抽奖纪录
        resourceService.queryPost($scope, $filter('getUrl')('十个抽奖纪录171016'), {}, { name: '十个抽奖纪录171016' });
		
		//验证是否是app
		$scope.isApp = $stateParams.wap ? false: true;
		if($scope.isApp){//假如是app  验证手机系统
			var u = navigator.userAgent;
			$scope.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			$scope.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		}

        // 判断是否在登录状态
        if($stateParams.wap){
            $scope.wap = $stateParams.wap;
            if ($filter('isRegister')().register==true) {
                $scope.ftype = 2;
                $scope.user = $filter('isRegister')().user;
                $scope.uid = $scope.user.member.uid;
            }
            else{
                $scope.ftype = 1;
            }
        }
        else if ($stateParams.uid) {
            $scope.uid = $stateParams.uid;
            $scope.ftype = 2;
            $scope.channel = $stateParams.channel;
            $scope.token = $stateParams.token;
            $scope.version = $stateParams.version;
        }
        else{
            $scope.ftype = 1;
        }
        $scope.WinningIndex = "";//中奖位置
        $scope.hasLuckNum = 0;//抽奖次数
        if($scope.ftype == 2){//假如是登录状态 获取 抽奖次数
            $scope.hasNumParms = {
                uid: $scope.uid, 
                channel: $scope.channel,
                token: $scope.token,
                version: $scope.version,
            }
            resourceService.queryPost($scope, $filter('getUrl')('抽奖次数171016'), $scope.hasNumParms, { name: '抽奖次数171016' });
        }
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, eObj) {
            switch (eObj.name) {
                case '抽奖次数171016':
                    if (data.success) {
                        $scope.hasLuckNum = data.map.num || 0;
                    }
                    break;
                case '开始抽奖171016':
                    if (data.success) {
                        $scope.WinningIndex = (data.map.Id-1) || 0;
                        resourceService.queryPost($scope, $filter('getUrl')('抽奖次数171016'), {uid: $scope.uid}, { name: '抽奖次数171016' });
                        roll();    //转圈过程不响应click事件，会将click置为false
                    }
                    break;
                case '十个抽奖纪录171016':
                    if (data.success) {
                        $scope.usersLuckList = data.map.list;
                    }
                    break;
                case '我的抽奖171016':
                    if (data.success) {
                        $scope.myPrizeList = data.map.list;
                        $scope.showMyLuckList = true;//显示我的中奖纪录弹窗
                    }
                    break;
            };
        });
        $scope.luckList = [
            {name: "0.5%加息券", fullName: "0.5%加息券"}, {name: "1%加息券", fullName: "1%加息券"},
            {name: "30元话费", fullName: "￥30元话费"}, {name: "50元话费", fullName: "￥50元话费"}, {name: "100元话费", fullName: "￥100元话费"},
            {name: "20元红包", fullName: "￥20元红包"}, {name: "88元红包", fullName: "￥88元红包"}, {name: "188元红包", fullName: "￥188元红包"}, {name: "288元红包", fullName: "￥288元红包"},
            {name: "50元京东卡", fullName: "￥50元京东卡"}, {name: "100元京东卡", fullName: "￥100元京东卡"}, {name: "200元京东卡", fullName: "￥200元京东卡"},
        ];

        var click=false;
        $scope.lotteryLoad = function() {  //抽奖初始化
            lottery.init('lottery');
        };

        $scope.startLuck = function(isModel){//开始抽奖
            if($scope.ftype == 1){//假如未登录
            	if($scope.isApp){//假如是app
            		location.href = "jsmp://page=4?";
            		return false;
            	}
                $state.go("login", { returnurl: 'luckyDrawV1' });
                return false;
            }
            if($scope.hasLuckNum <= 0){//无抽奖机会时 弹出获取抽奖次数 引导
                $scope.noHasLuckNum = true;
                return false;
            }
            if(isModel){
                $scope.modelCanEnter = false;//抽奖完成 点击弹窗上 在抽一次 时 弹窗关闭
            }

            if (click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            }else{
                lottery.speed=60;
                resourceService.queryPost($scope, $filter('getUrl')('开始抽奖171016'), {uid: $scope.uid}, { name: '开始抽奖171016' });
                click=true; //一次抽奖完成后，设置click为true，可继续抽奖
                return false;
            }
        };

        $scope.winningLoad = function(){//中奖纪录滚动
            $('#winning-record-box').scrollbox({
                linear: true,
                step: 1,
                delay: 0,
                speed: 60
            })
        }

        $scope.showMyLuckList = false;//我的中奖纪录显示 关闭变量
        $scope.closeLuckList = function(){
            $scope.showMyLuckList = false;
        }
        $scope.showMyLuckListFn = function(){
            $scope.myPrizeList =  [];
            resourceService.queryPost($scope, $filter('getUrl')('我的抽奖171016'), $scope.hasNumParms, { name: '我的抽奖171016' });
        }

        $scope.noHasLuckNum = false; //无抽奖机会时
        $scope.modelCanEnter = false;//抽奖最后弹窗
        $scope.closeEnter = function(){
            $scope.noHasLuckNum = false;
            $scope.modelCanEnter = false;
        }
        
        //点击活动按钮  跳转页面
		$scope.clickBtnGoPage = function(url,parms){
			$scope.showMyLuckList = false;
			$scope.modelCanEnter = false;
			$scope.noHasLuckNum = false;
			$state.go(url, parms);
		}
        
        $scope.$watch('modelCanEnter',function(newV,oldV){//阻止滚动穿透
            if(newV){
                $("html").css({'height': '100%','overflow': 'hidden'});
            }else{
                $("html").css({'height': 'auto','overflow': 'auto'});
            }
        });
        $scope.$watch('noHasLuckNum',function(newV,oldV){//阻止滚动穿透
            if(newV){
                $("html").css({'height': '100%','overflow': 'hidden'});
            }else{
                $("html").css({'height': 'auto','overflow': 'auto'});
            }
        });
        $scope.$watch('showMyLuckList',function(newV,oldV){//阻止滚动穿透
            if(newV){
                $("html").css({'height': '100%','overflow': 'hidden'});
            }else{
                $("html").css({'height': 'auto','overflow': 'auto'});
            }
        });


        var lottery={
            index:-1,    //当前转动到哪个位置，起点位置
            count:0,    //总共有多少个位置
            timer:0,    //setTimeout的ID，用clearTimeout清除
            speed:20,    //初始转动速度
            times:0,    //转动次数
            cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,    //中奖位置
            init:function(id){
                var $lottery,$units;
                if ($("#"+id).find(".lottery-unit").length>0) {
                    $lottery = $("#"+id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-"+this.index).addClass("active");
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-"+index).removeClass("active");
                index += 1;
                if (index>count-1) {
                    index = 0;
                };
                $(lottery).find(".lottery-unit-"+index).addClass("active");
                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            }
        };
        
        function roll(){
            lottery.times += 1;
            lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
            if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
                clearTimeout(lottery.timer);
                $timeout(function(){
                    $scope.modelCanEnter = true;//中奖弹窗打开
                },1000);
                lottery.prize=-1;
                lottery.times=0;
                click=false;
            }else{
                if (lottery.times<lottery.cycle) {
                    lottery.speed -= 10;
                }else if(lottery.times==lottery.cycle) {
                    // var index = Math.random()*(lottery.count)|0;//中奖物品通过一个随机数生成
                    var index = $scope.WinningIndex;//中奖物品通过一个随机数生成
                    lottery.prize = index;     
                }else{
                    if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed<40) {
                    lottery.speed=40;
                };
                //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                lottery.timer = setTimeout(roll,lottery.speed);//循环调用
            }
            return false;
        }
    }]);
});