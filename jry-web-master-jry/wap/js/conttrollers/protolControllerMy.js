//recharge/get-cash.html
define(['js/module.js'], function (controllers) {
        controllers.controller('protolController', function ($scope, $filter, $state, $rootScope, resourceService, ngDialog, postcallService,$stateParams) {
            $rootScope.title = "投资协议";
            $scope.userJ=""//甲方
            $scope.userId=""//甲方身份证号码
            $scope.procolId=""//借款协议编号
            $scope.projectName=""//项目名称
            $scope.projectMoney=""//转让债权金额
            $scope.projectRate=""//债权年化利率
            $scope.backWay=""//还款方式
            $scope.projectDate=""//债权到期日
            $scope.projectTotalMoney=""//债权金额
            $scope.projectOrignDate=""//标的债权收益起算日
            
            console.log(11111);
            
            //上拉/下拉弹性            
//	        var srollsFirst = document.getElementById('slide1');
//	        var myscrollFirst = new iScroll(srollsFirst,{
//	          vScrollbar: false,
//	          onScrollEnd: function(){
//	            if( (this.y == this.maxScrollY)) {	              
//	              // 加载数据
//	              setTimeout(function(){	              	
//	                myscrollFirst.refresh();
//	              },10)
//	            }
//	          }
//	        })
        });
    })