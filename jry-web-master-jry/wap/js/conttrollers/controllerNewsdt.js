define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controllerNewsdt', function ($scope,$sce,resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
          
//  var time=new Date().getTime();
//  var time2=new Date();
//  console.log(time2.getFullYear().toString()+'-'+(time2.getMonth()+1).toString()+'-'+time2.getDate().toString());
//  console.log(typeof(time2.getFullYear()))
//  $rootScope.newtime=time;

//      console.log($stateParams.artiId) 
//      $scope.newartiId=$stateParams.artiId                               
        resourceService.queryPost($scope, $filter('getUrl')('新闻详情'), {artiId:41}, '新闻详情');
        $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
         console.log(111111)
            switch(type){
                case '新闻详情':
                    if (data.success){
                    	console.log(data);
                        var article=data.map.sysArticle
                        $scope.newsTitle = article.title;
                        $scope.creatTime = article.createTime;
                        $scope.articleImgSrc = article.litpic;
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
                        console.log(12121212);
                    }
                break;                                       
            };
        });
                                                             
    })
})