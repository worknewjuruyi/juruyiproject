//暂无对应controller
define(['js/module.js', 'jquery',], function(controllers, $) {
    'use strict';
    controllers.controller("regSuccess",["$scope",function($scope){
        $scope.jihuoFn = function(){//判断手机系统 跳转对应的app下载
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // alert('是否是Android：'+isAndroid);
            // alert('是否是iOS：'+isiOS);
            if(isAndroid){
                window.open("http://m.bocailicai.cn/bclc_app.apk");
            }
            if(isiOS){
                window.open("https://itunes.apple.com/cn/app/%e8%8f%a0%e8%8f%9c%e7%90%86%e8%b4%a2-%e5%ae%89%e5%85%a8%e4%b8%93%e4%b8%9a%e7%9a%84%e4%ba%92%e8%81%94%e7%bd%91%e6%8a%95%e8%b5%84%e5%b9%b3%e5%8f%b0/id1289134075?mt=8");
            }
        }
    }]);
});