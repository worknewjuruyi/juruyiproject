//myaccount/my-invest.html
define([
    'js/module.js'
    , 'framework/jquery-asPieProgress.js'
    , 'framework/rainbow.min.js'    
    ]
    ,function(controllers){
    controllers.controller('signCtrl'
        ,['$scope'
        ,'$rootScope'
        ,'$filter'
        ,'$state'
        ,'resourceService'
        ,'$localStorage'
        ,'$http'
        ,'$stateParams'
        ,function($scope,$rootScope,$filter,$state,resourceService,$localStorage,$http,$stateParams){                        
	        //签到
//          var betweenTime = 0;
//			var b=0;
//			var num = 0;
//			document.addEventListener('webkitvisibilitychange',function()
//			{
//			    if(document.webkitVisibilityState=='hidden')
//			    {
//			        b=Date.now();
//			    }else
//			    {
//			        var betweenMs = Date.now() - b;
//			        var  betweens = Math.floor(betweenMs / 1000);
//			        betweenTime = Math.floor(betweens / 60);
//			        console.log('间隔:' + betweenTime + '分钟');
//			        num=betweenTime;
//			        $scope.newtime=num
//			    }
//			});
            //app传递用户的uid和token到链接地址里我们接收
            console.log($stateParams.ui)
            var calUtil = {  
				  //当前日历显示的年份  
				  showYear:2018,  
				  //当前日历显示的月份  
				  showMonth:1,  
				  //当前日历显示的天数  
				  showDays:1,  
				  eventName:"load",  
				  //初始化日历  
				  init:function(signList,signDateMonth,signDateDay){  				  	
				    calUtil.setMonthAndDay(signDateMonth,signDateDay);  
				    calUtil.draw(signList);  
				    calUtil.bindEnvent();
				  },  
				  draw:function(signList){  
				    //绑定日历  
				    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList);  
				    $("#calendar").html(str);  
				    //绑定日历表头  
				    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";  
				    $(".calendar_month_span").html(calendarName);    
				  },  
				  //绑定事件  
				  bindEnvent:function(){  
				    //绑定上个月事件  
				    $(".calendar_month_prev").click(function(){ 				    	
				      //ajax获取日历json数据  
//				      var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];  
				      calUtil.eventName="prev";  
				      //发送上个月日期给后台 获取上个月的签到数据
				      var newcalUtilYear=calUtil.showYear;
				      calUtil.showMonth-=1;
				      if(calUtil.showMonth==0){  
			            calUtil.showMonth=12;  
			            newcalUtilYear=calUtil.showYear-1
				      }
				      if (calUtil.showMonth<=9) {
				      	calUtil.showMonth="0"+calUtil.showMonth
				      } 				      				      
				      $scope.prevMonth=newcalUtilYear+'-'+calUtil.showMonth;
				      console.log($scope.prevMonth);
				      resourceService.queryPost($scope, $filter('getUrl')('签到记录'),
				      {
				      	uid:38,
				      	token:'2001',
				      	date:$scope.prevMonth
				      },
				      '签到记录');
				    });  
				    //绑定下个月事件  
				    $(".calendar_month_next").click(function(){ 				    	
				      //ajax获取日历json数据  
//				      var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];  
				      calUtil.eventName="next";
				      //发送下个月日期给后台 获取下个月的签到数据				      
				      var newcalUtilYear=calUtil.showYear;
				      calUtil.showMonth+=1;
				      if(calUtil.showMonth==13){  
			            calUtil.showMonth=1;  
			            newcalUtilYear=calUtil.showYear+1
				      }
				      if (calUtil.showMonth<=9) {
				      	calUtil.showMonth="0"+calUtil.showMonth
				      }
				      $scope.nextMonth=newcalUtilYear+'-'+calUtil.showMonth;
				      console.log($scope.nextMonth);
				      resourceService.queryPost($scope, $filter('getUrl')('签到记录'),
				      {
				      	uid:38,
				      	token:'2001',
				      	date:$scope.nextMonth
				      },
				      '签到记录');
				      
				    });  
				  },  
				  //获取当前选择的年月  ajax后台获取年月
				  setMonthAndDay:function(signDateMonth,signDateDay){  
				    switch(calUtil.eventName)  
				    {  
				      case "load":  
				        var current = new Date(signDateMonth,signDateDay);  
				        calUtil.showYear=current.getFullYear();  
				        calUtil.showMonth=current.getMonth();  
				        break;  
				      case "prev":  
				        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0]; 
				        calUtil.showMonth=parseInt(nowMonth)-1; 				        
				        if(calUtil.showMonth==0)  
				        {  
				            calUtil.showMonth=12;  
				            calUtil.showYear-=1;  
				        }  
				        break;  
				      case "next":  
				        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0]; 
				        calUtil.showMonth=parseInt(nowMonth)+1;  
				        if(calUtil.showMonth==13)  
				        {  
				            calUtil.showMonth=1;  
				            calUtil.showYear+=1;  
				        } 				        				        
				        break;  
				    }  
				  },  
				  getDaysInmonth : function(iMonth, iYear){  
				   var dPrevDate = new Date(iYear, iMonth, 0);  
				   return dPrevDate.getDate();  
				  },  
				  bulidCal : function(iYear, iMonth) {  
				   var aMonth = new Array();  
				   aMonth[0] = new Array(7);  
				   aMonth[1] = new Array(7);  
				   aMonth[2] = new Array(7);  
				   aMonth[3] = new Array(7);  
				   aMonth[4] = new Array(7);  
				   aMonth[5] = new Array(7);  
				   aMonth[6] = new Array(7);  
				   var dCalDate = new Date(iYear, iMonth - 1, 1);  
				   var iDayOfFirst = dCalDate.getDay();  
				   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);  
				   var iVarDate = 1;  
				   var d, w;  
				   aMonth[0][0] = "日";  
				   aMonth[0][1] = "一";  
				   aMonth[0][2] = "二";  
				   aMonth[0][3] = "三";  
				   aMonth[0][4] = "四";  
				   aMonth[0][5] = "五";  
				   aMonth[0][6] = "六";  
				   for (d = iDayOfFirst; d < 7; d++) {  
				    aMonth[1][d] = iVarDate;  
				    iVarDate++;  
				   }  
				   for (w = 2; w < 7; w++) {  
				    for (d = 0; d < 7; d++) {  
				     if (iVarDate <= iDaysInMonth) {  
				      aMonth[w][d] = iVarDate;  
				      iVarDate++;  
				     }  
				    }  
				   }  
				   return aMonth;  
				  },  
				  ifHasSigned : function(signList,day){  
				   var signed = false;  
				   $.each(signList,function(index,item){  
				    if(item.signDay == day) {  
				     signed = true;  
				     return false;  
				    }  
				   });  
				   return signed ;  
				  },  
				drawCal : function(iYear, iMonth ,signList) {  
				   var myMonth = calUtil.bulidCal(iYear, iMonth);  
				   var htmls = new Array();  
				   htmls.push("<div class='sign_main' id='sign_layer'>");  
				   htmls.push("<div class='sign_succ_calendar_title'>");  
				   htmls.push("<div class='calendar_month_next'>下月</div>");
				   htmls.push("<div class='calendar_month_prev'>上月</div>");
				   htmls.push("<div class='calendar_month_span'></div>");  
				   htmls.push("</div>");  
				   htmls.push("<div class='sign' id='sign_cal'>");  
				   htmls.push("<table>");  
				   htmls.push("<tr>");  
				   htmls.push("<th>" + myMonth[0][0] + "</th>");  
				   htmls.push("<th>" + myMonth[0][1] + "</th>");  
				   htmls.push("<th>" + myMonth[0][2] + "</th>");  
				   htmls.push("<th>" + myMonth[0][3] + "</th>");  
				   htmls.push("<th>" + myMonth[0][4] + "</th>");  
				   htmls.push("<th>" + myMonth[0][5] + "</th>");  
				   htmls.push("<th>" + myMonth[0][6] + "</th>");  
				   htmls.push("</tr>");  
				   var d, w;  
				   for (w = 1; w < 7; w++) {  
				    htmls.push("<tr>");  
				    for (d = 0; d < 7; d++) {  
				     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);  
				//   console.log(ifHasSigned);  
				     if(ifHasSigned){  
				      htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");  
				     } else {  
				      htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");  
				     }  
				    }  
				    htmls.push("</tr>");  
				   }  
				   htmls.push("</table>");  
				   htmls.push("</div>");  
				   htmls.push("</div>");  
				   return htmls.join('');  
				}  
			
			};  



            
            resourceService.queryPost($scope, $filter('getUrl')('是否已签到'),{uid:38,token:'2001'},'是否签到');
            resourceService.queryPost($scope, $filter('getUrl')('签到记录'),{uid:38,token:'2001'},'签到记录');
            resourceService.queryPost($scope, $filter('getUrl')('签到积分'),{uid:38,token:'2001'},'签到积分');
            $scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
                switch (type) {
                    case '签到记录':
                        if (data.success) {
                            var newdataList=data.map.data
                            //console.log(newdataList)
                            //循环获取的签到日期 转化为 需要的格式
							for (var i = 0; i < newdataList.length; i++) {
								newdataList[i]={"signDay":newdataList[i].substring(8,10)}
							}
							$scope.signList=newdataList;
							
							calUtil.init($scope.signList,calUtil.showYear,calUtil.showMonth);
							//连续签到次数
							$scope.signNum=data.map.clickNum;
                        } else {
                            console.log(data.errorMsg)
                        }
                        break;
                    case '签到积分':
                        if (data.success) {
                            $scope.nowIntegral=data.map.integralSum;//当前签到积分                                                        
                        } else {
                            console.log(data.errorMsg)
                        }
                        break;
                    case '是否签到':
                        if (data) {
                        	$scope.signDate=data.map.data;
                            $scope.signDateYear=parseInt(data.map.data.substring(0,4));
                            $scope.signDateMonth=parseInt(data.map.data.substring(5,7));
                            calUtil.init([],$scope.signDateYear,$scope.signDateMonth)//初始化日历
                            
                            $scope.isSign=data.success;//是否已签到标志
                            console.log(data.success);
					        if (!$scope.isSign) {    //未签到    	
					        	$scope.signOk=false;
					        	$scope.isGrey=false;
					        	$scope.signWord='签到'
					        } else{      //已签到  	
				                $scope.signOk=true;
					        	$scope.isGrey=true; 
					        	$scope.signWord="已签到"
					        }
                        } else {
                            console.log(data.errorMsg);
                            
                        }
                        break; 
                    case '点击签到':
                        if (data.success) {
                        	//这里写签到之后的打钩效果
                            console.log(data.msg);
                            console.log($("td.on:last").html());
                            console.log($("td.on").length);
                            $("td.on:last").addClass("sign-show");//添加签到打钩动画
                            $scope.isSign=data.success;
                            if (!$scope.isSign) {    //未签到    	
					        	$scope.signOk=false;
					        	$scope.isGrey=false;
					        	$scope.signWord='签到'
					        } else{      //已签到  	
				                $scope.signOk=true;
					        	$scope.isGrey=true; 
					        	$scope.signWord="已签到"
					        }                            
                        } else {
                        	console.log($("td.on").length);
                        	console.log($("td.on:last").html());
                            console.log("系统错误");
                            $filter('系统错误信息')('2', $scope);
                        }
                        break;
                };
            });
//          
            	       	        	        
	        //是否可签到标记--ajax后台获取	        
			$scope.signNow=function(){
//				//ajax获取当前用户的本月签到数据，连续签到数据 
//				$scope.signList=[{"signDay":"09"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"},{"signDay":"15"}]; 
//				calUtil.init($scope.signList);
//				//ajax请求成功后弹出层出现
//				$scope.signIn();
//              $scope.signOk=true;
//	        	$scope.isGrey=true; 
//	        	$scope.signWord="已签到";	 
                resourceService.queryPost($scope, $filter('getUrl')('点击签到'),{uid:38,token:'2001'},'点击签到');
                resourceService.queryPost($scope, $filter('getUrl')('签到记录'),{uid:38,token:'2001'},'签到记录'); 
                resourceService.queryPost($scope, $filter('getUrl')('签到积分'),{uid:38,token:'2001'},'签到积分');
			}
						
			//弹出层出现效果
			$scope.signIn=function(){
				$(".maskbox").fadeIn("fast");
				$(".qdbox").fadeIn("fast");
			}
			
			//弹出层消失效果			
			$scope.btnYesClick=function(){
				$(".maskbox").fadeOut();
				$(".qdbox").fadeOut();
			}
	        
	        
	       
	        
        }
    ]);
})