define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controllerNewsdt', function ($scope,$sce,resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {          
        var time=new Date().getTime();
        var time2=new Date();
        $rootScope.newtime=time;
        
        $scope.isHeader=false;//是否显示头部 如果app传参跳转过来 header不显示 否则就是wap页面 则显示头部
        
        console.log($stateParams.uid);                               
        resourceService.queryPost($scope, $filter('getUrl')('新闻详情'), {artiId:41}, '新闻详情');
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
            switch(type){
                case '新闻详情':
                    if (data.success){
                    	console.log(data);
                        var article=data.map.sysArticle
                        $scope.newsTitle = article.title;
                        $scope.creatTime = article.createTime;
//                      $scope.articleImgSrc = article.litpic;
                        //调用$sce转化html输出到页面($sce必须先注入才能使用)                        
                        $scope.content = $sce.trustAsHtml(article.content);
                        //iscroll滚动                     
                        $scope.$watch('$viewContentLoaded', function() {//$watch监听页面加载完毕才执行iscroll
					    	var srollsFirst = document.getElementById('slide2');
					        var myscrollFirst = new iScroll(srollsFirst,{
					          vScrollbar: false,
					          onScrollEnd: function(){
					            if( (this.y == this.maxScrollY)) {	              
					              // 加载数据
					              setTimeout(function(){	              	
					                myscrollFirst.refresh();
					              },10)
					            }
					          }
					        })
				        }); 
                    }else{
                        console.log("系统错误");
                    }
                break;                                       
            };
        });
                                                             
    })
})