define(['js/module.js', 'jquery', 'ngdialog'], function (controllers, $, ngdialog) {
    controllers.controller('controllerNewsdt', function ($scope, resourceService, $filter, $http, $state, $rootScope, $localStorage, ngDialog, $stateParams,md5) {
    
    
    
    
//	$http.get('http://192.168.17.101:8888/aboutus/newsDetails.do').  
//  success(function(data) {
//  	
//      console.log(data);  
//  }).  
//  error(function(err) {  
//      //错误代码  
//  });
	var srollsFirst = document.getElementById('slide2');
     var myscrollFirst = new iScroll(srollsFirst,{
       vScrollbar: false,
       onScrollEnd: function(){
         if((this.y == this.maxScrollY)){               
           // 加载数据
           setTimeout(function(){                
             myscrollFirst.refresh();
           },10)
         }
       }
     })
   
//  var time=new Date().getTime();
//  var time2=new Date();
//  console.log(time2.getFullYear().toString()+'-'+(time2.getMonth()+1).toString()+'-'+time2.getDate().toString());
//  console.log(typeof(time2.getFullYear()))
//  $scope.newtime=time;
    
    
    
//   resourceService.queryPost($scope, $filter('getUrl')(''), {}, { name: '新闻详情'});
//  $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type){
//  	    console.log(type.name)
//          switch (type.name){                
//              case '新闻详情':
//                  console.log(11111)
//                  if (data.success) {
//                      console.log(data)
//                  } else {
//                      
//                  };
//                  break;
//          };
//      });



//   $.ajax({
//	     type:"get",    //请求方式
//	      async:true,    //是否异步
//	      url:"http://192.168.17.101:8888/aboutus/newsDetails.do",
//	      dataType:"json",    //跨域json请求一定是jsonp
////	      xhrFields: {
////	           withCredentials: true
////	       },
//           headers: {
//               'Content-type': 'application/json'
//           },
////	       crossDomain: true,
////	      jsonp: "callback",    //跨域请求的参数名，默认是callback
//	          //jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
//	      data:{},    //请求参数
//	
//	     success: function(data) {
//	         console.log(data)
//	     },
//	   
//	   
//	     error: function() {
//	         //请求出错处理
//	         console.log(111111)
//	     }
//	 });



//          $http({  
//             url:'aboutus/newsDetails.dos',  
//             
//             	method:"GET"                           
//         }).success(function(data){
//          	console.log(data)
//         }).error(function(data){
//          	console.log(data)
//         })

//          $http({
//           method: 'POST',
//           url: 'aboutus/newsDetails.dos',
//           headers: {
//               'Content-Type' : 'application/x-www-form-urlencoded'
//           },
//           data: { }
//       }).then(function success(result){
//           //数据请求成功
//           console.log(result.data);
//       },function error(err){
//           //数据请求失败
//           console.log(err);
//       });

//
//      console.log($stateParams.artiId) 
//      $scope.newartiId=$stateParams.artiId
        console.log("yeyeyeyey")                                
        resourceService.queryPost($scope, $filter('getUrl')('新闻详情'), {artiId:1}, '新闻详情');
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
                        $scope.content = article.content;
                    }else{
                        console.log(12121212);
                    }
                break;                                       
            };
        });
    })
})