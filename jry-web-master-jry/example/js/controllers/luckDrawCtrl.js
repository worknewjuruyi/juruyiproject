//login/luckDraw.html
mainModule.controller('luckDrawCtrl',function ($scope, $rootScope, $http, $state,
                                              $stateParams, $localStorage, $location, resourceService,$filter,$timeout) {
    //用户中奖记录的10个中奖记录列表
    function toTen() {
        resourceService.queryPost($scope,$filter('交互接口对照表')('十个中奖记录'),{},'十个中奖记录1');
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
            switch(type){
                case "十个中奖记录1":
                    $scope.awordZj=data.map.list;
                    (function($){
                        $.fn.myScroll = function(options){//10条记录滚动列表jq插件
                            //默认配置
                            var defaults = {
                                speed:40,  //滚动速度,值越大速度越慢
                                rowHeight:35 //每行的高度
                            };
                            var opts = $.extend({}, defaults, options),intId = [];
                            function marquee(obj, step){
                                obj.find("ul").animate({
                                    marginTop: '-=1'
                                },0,function(){
                                    var s = Math.abs(parseInt($(this).css("margin-top")));
                                    if(s >= step){
                                        $(this).find("li").slice(0, 1).appendTo($(this));
                                        $(this).css("margin-top", 0);
                                    }
                                });
                            }
                            this.each(function(i){
                                var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
                                intId[i] = setInterval(function(){
                                    if(_this.find("ul").height()<=_this.height()){
                                        clearInterval(intId[i]);
                                    }else{
                                        marquee(_this, sh);
                                    }
                                }, speed);
                                _this.hover(function(){
                                    clearInterval(intId[i]);
                                },function(){
                                    intId[i] = setInterval(function(){
                                        if(_this.find("ul").height()<=_this.height()){
                                            clearInterval(intId[i]);
                                        }else{
                                            marquee(_this, sh);
                                        }
                                    }, speed);
                                });

                            });
                        };
                    })(jQuery);
                    $(function(){
                        $(".zjjl_border").myScroll({
                            speed:40, //数值越大，速度越慢
                            rowHeight:35 //li的高度
                        });
                    });
                    break;
            }
        });
        $scope.img2Hover=function () {
            $scope.luckDrawab1show=true;
        }
        $scope.img2leave=function () {
            $scope.luckDrawab1show=false;
        }
        $scope.img3Hover=function () {
            $scope.luckDrawab1show333=true;
        }
        $scope.img3leave=function () {
            $scope.luckDrawab1show333=false;
        }
    
    }
    //小火箭回顶部的效果
    function onscrollFun() {
        window.onscroll=function () {
            if($(window).scrollTop()>39){
                $("#wrapperId").addClass("asmallClass");
                $("#abigId").addClass("abigClass");
            }
            else{
                $("#wrapperId").removeClass("asmallClass");
                $("#abigId").removeClass("abigClass");

            }
            
            //小火箭回顶部何时显示 何时隐藏的效果
            $("#luckDrawabId").hide()
            if($(window).scrollTop()>0&&$(window).scrollTop()<1410){
                $("#luckDrawabId").show();
            }
            else{
                $("#luckDrawabId").hide();
            }
        }
        //点击回到顶部的延迟动画效果
        $("#toTop").click(function () {
            // window.scrollTo(0,0)
            $('html,body').animate({scrollTop: '0px'}, 800);
        });
    }
    
    //抽奖部分内容的代码-抽奖代码函数
    function cjcodeFun() {
        $("#djcjFont").html("点击抽奖");
        //大转盘的构建
        var lottery={
            index:-1,   //当前转动到哪个位置，起点位置
            count:0,    //总共有多少个位置
            timer:0,    //tTimeout的ID，用clearTimeout清除
            speed:20,   //初始转动速度
            times:0,    //转动次数
            cycle:50,   //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,   //中奖位置
            init:function(id){//初始化转盘
                if ($("#"+id).find(".lottery-unit").length>0) {
                    $lottery = $("#"+id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-"+this.index).addClass("active");
                }
            },
            roll:function(){//转盘转动时活动元素的样式添加以及移除
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-"+index).removeClass("active");
                index += 1;
                if (index>count-1) {
                    index = 0;
                }
                $(lottery).find(".lottery-unit-"+index).addClass("active");
                this.index=index;
                return false;
            },
            stop:function(index){//转盘停止
                this.prize=index;
                return false;
            }
        };
        function roll(){
            lottery.times += 1;
            lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
            if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize=-1;
                lottery.times=0;
                click=false;
                resourceService.queryPost($scope,$filter('交互接口对照表')('抽奖次数'),{},'我的抽奖2');
                $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
                    switch(type){
                        case "我的抽奖2":
                            $scope.num=data.map.num;
                            $scope.cjjhlhbd="您还有"+data.map.num+"次抽奖机会";
                            break;
                    }
                });
                $scope.nganimationShow=true;
                $scope.luckDraw_absolute=true;
                var timer = $timeout(
                    function() {
                        $scope.isnganimation2Show=true;
                        $scope.luckDraw_absolute=false;
                        $timeout.cancel(timer);
                    },
                    1500
                );
                //    中奖做的事情
                $("#djcjFont").html("点击抽奖");
            }else{
                if (lottery.times<lottery.cycle) {
                    lottery.speed -= 10;
                }else if(lottery.times==lottery.cycle) {
                    resourceService.queryPost($scope,$filter('交互接口对照表')('转盘'),{},'转盘抽奖');
                    $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event, data, type) {
                        switch(type){
                            case "转盘抽奖":
                                var index=data.map.Id-1
                                lottery.prize = index;
                                if(data.map.Id==1){
                                    $scope.fontWORD="0.5%加息卷";
                                }else if(data.map.Id==2){
                                    $scope.fontWORD="1%加息卷";
                                }else if(data.map.Id==3){
                                    $scope.fontWORD="30元话费";
                                }else if(data.map.Id==4){
                                    $scope.fontWORD="50元话费";
                                }else if(data.map.Id==5){
                                    $scope.fontWORD="100元话费";
                                }else if(data.map.Id==6){
                                    $scope.fontWORD="20元红包";
                                }else if(data.map.Id==7){
                                    $scope.fontWORD="88元红包";
                                }else if(data.map.Id=8){
                                    $scope.fontWORD="188元红包";
                                }else if(data.map.Id==9){
                                    $scope.fontWORD="288元红包";
                                }else if(data.map.Id==10){
                                    $scope.fontWORD="50元京东卡";
                                }else if(data.map.Id==11){
                                    $scope.fontWORD="100元京东卡";
                                }else if(data.map.Id==12){
                                    $scope.fontWORD="200元京东卡";
                                }
                                break;
                        }
                    });
                }else{
                    if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed<40) {
                    lottery.speed=40;
                }
                lottery.timer = setTimeout(roll,lottery.speed);//循环调用
            }
            return false;
        }

        var click=false;//防止抽奖过程中的重复点击标记
        lottery.init('lottery');
        //获取抽奖次数
        //是否登录判断
        if($localStorage.user){//已登录
            //    查看我的奖品
            $scope.wdjbIdClick=function () {
                $scope.luckDraw_absolute=true;
                $scope.luckDraw_absolute3Show3=true;
                $scope.ljckClick=function () {
                    $state.go("main.myAccount.myCoupon") ;
                };
                // 接口
                resourceService.queryPost($scope,$filter('交互接口对照表')('我的奖品'),{},'我的奖品1');
                $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
                    switch(type){
                        case "我的奖品1":
                            $scope.wdjpZj=data.map.list;
                            $scope.colorNG="colorBg1";
                            $scope.setColor=function (status) {
                                var p="";
                                if(6==status){
                                    p="#a96df7";
                                }else if(2==status){
                                    p="#65bcf1";
                                }else if(1==status){
                                    p="#ea5e58";
                                }else if(7==status){
                                    p="#f47c2d";
                                }
                                return {"background":p};
                            };
                            break;
                    }
                });
            }
            $scope.luckDrawab1Click=function () {//点击弹窗的黑色背景则关闭弹窗
                $scope.luckDraw_absolute=false;
                $scope.luckDraw_absolute3Show3=false;
                $scope.luckDraw_absolute2Show22=false;
            };
            resourceService.queryPost($scope,$filter('交互接口对照表')('抽奖次数'),{},'抽奖次数1');
            $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
                switch(type){
                    case "抽奖次数1":
                        $scope.num=data.map.num;
                        $scope.cjjhlhbd="您还有"+data.map.num+"次抽奖机会"
                        break;
                };
            });
            //
            $scope.onclickCj=function () {
                $scope.nganimationShow=false;
                $scope.isnganimation2Show=false;
                $scope.luckDraw_absolute=false;
                resourceService.queryPost($scope,$filter('交互接口对照表')('抽奖次数'),{},'抽奖次数1');
                $scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
//              	console.log(type);
//              	console.log(data)
                    switch(type) {
                        case "抽奖次数1":
                            $scope.num = data.map.num;
                            if(data.map.num==0){
                                $scope.luckDraw_absolute2Show22=true;
                                $scope.luckDraw_absolute=true;
                                $scope.yqhyHd=function () {
                                    $state.go("main.myAccount.myFriend");
                                };
                                $scope.wytzHd=function () {
                                    $state.go("main.productsList");
                                };
                                click=true;
                                return false;
                            }else{
                                $("#djcjFont").html("期待奖品")
                                if (click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                                    return false;
                                }else{
                                    lottery.speed=100;
                                    roll();    //过程不响应click事件，会将click置为false
                                    click=true; //一次抽奖完成后，设置click为true，可继续抽奖
                                    return false;
                                }
                            }
                    } });
            };
            //
        }else{//没有登录            
            $("#djcjFont").html("点击登录");
            // $("#dlzhck").html("登录后查看抽奖次数");
            $scope.cjjhlhbd="登录后可查看抽奖次数"
            $("#onclickCj").click(function () {
                $filter("跳转页面")('denLu','main.luckDraw','login');
            });
            $scope.wdjbIdClick=function () {
                $filter("跳转页面")('denLu','main.luckDraw','login');
            };
        }

    }
    //前十名：  函数
    toTen();
    //当滚动条滚动的时候
    onscrollFun();
    //抽奖的代码
    cjcodeFun();
});