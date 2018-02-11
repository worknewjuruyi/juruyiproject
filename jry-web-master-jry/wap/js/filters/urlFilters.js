'use strict';
define(['app'], function (app) {
    app.filter('getUrl', function () {
        return function (name) {
        	var base='/'
//          var base = '192.168.17.126:8080/mobile/'
            var urls = {
                // 首页
                "shouYe": base + "index/index.dos",
//              "shouYe": base + "index/index.do",
                // 注册
                "getyzm": base + "register/sendRegMsg.dos",
                "getPhone": base + "register/existMobilePhone.dos",
                "zuce": base + "register/reg.dos",
                // 我的帐户
                "myacc": base + "accountIndex/info.dos",
                "我的资产": base + "accountIndex/myFunds.dos",
                "站内信": base + "messageCenter/getMessage.dos",
                "我的投资": base + "investCenter/productList.dos",
                "我的明细": base + "assetRecord/index.dos",
                "我的信息": base + "memberSetting/index.dos",
                "我的银行卡": base + "memberSetting/myBankInfo.dos",
                "我的消息": base + "messageCenter/getMessage.dos",
                "我的红包": base + "activity/index.dos",
                "信息认证": base + "memberSetting/sendBankMsg.dos",
                "实名认证": base + "memberSetting/bankInfoVerify.dos",
                "充值index": base + "recharge/index.dos",
                "创建订单": base + "recharge/createPayOrder.dos",
                "充值验证码": base + "recharge/sendRechargeSms.dos",
                "充值": base + "recharge/goPay.dos",
                "提现": base + "withdrawals/index.dos",
                "提现申请": base + "withdrawals/addWithdrawals.dos",
                // 登录
                "login": base + "login/doLogin.dos",
                "短信验证": base + "memberSetting/sendForgetTpwdCode.dos",
                "完成设置交易密码提交": base + "memberSetting/updateTpwdBySms.dos",
                "判断用户状态": base + "memberSetting/index.dos",

                /*产品*/
                "cplist": base + "product/list.dos",
                "cpDetail": base + "product/detail.dos",
                "cpPicAndInvest": base + "product/detail_info.dos",
                "产品可用优惠券": base + "activity/usable.dos",
                "购买产品": base + "product/invest.dos",

                "交易密码重置短信验证码": base + "memberSetting/sendForgetTpwdCode.dos",
                "设置交易密码": base + "memberSetting/updateTpwdBySms.dos",

                "登录密码重置短信验证码": base + "memberSetting/forgetPwdSmsCode.dos",
                "设置登录密码": base + "memberSetting/updateLoginPassWord.dos",
                "意见反馈": base + "system/feedback.dos",
                "银行限额列表": base + "recharge/getBankQuotaList.dos",
                '回款记录': base + "investCenter/repayInfoDetail.dos",
                'getActivityFriendConfigAll': base + 'activity/getActivityFriendConfigAll.dos',
                'getActivityFriendConfig': base + 'activity/getActivityFriendConfig.dos',
                'getActivityFriendStatistics': base + 'activity/getActivityFriendStatistics.dos',
                'getTheRewards': base + 'assetRecord/getTheRewards.dos',
                'getPromoteRedelivery': base + 'member/getPromoteRedelivery.dos',
                'getUse': base + 'member/getUse.dos',
                'myInvitation': base + 'activity/myInvitation.dos',
                // 关于我们
                '网站公告': base + 'aboutus/newsInformationList.dos',
                '公告详情': base + 'aboutus/newsDetails.dos',
                // 体验标
                '体验标详情': base + 'product/experienceDetail.dos',
                '体验标投资': base + 'product/experienceInvest.dos',
                // 邀请好友三重礼top10
                '邀请好友三重礼top10': base + 'activity/getRankingList.dos',
                // 我的邀请页面
                '我的邀请': base + 'activity/firstInvestList.dos',
                // 总注册人数
                '总注册人数': base + 'member/selectDrmembercount.dos',
                // 存管开户
                '存管开户':base+'member/openAccount.dos',
                // 存管提现
                '存管提现':base+'withdrawals/depositsWithdrawals.dos',
                // 存管充值验证码
                '存管充值验证码':base+'recharge/fuiouSendSms.dos',
                // 存管充值
                '存管充值':base+'recharge/fuiouFastRecharg.dos',
                // 我的存管账户
                '我的存管账户':base+'memberSetting/fuiouIndex.dos',
                // 存管账户重置存管交易密码
                '重置存管交易密码':base+'memberSetting/fuiouUpdatePwd.dos',
                '抽奖次数171016':base+'activityLottery/getLotteryNum.dos',
                '开始抽奖171016':base+'activityLottery/getLotteryPriz.dos',
                '我的抽奖171016':base+'activityLottery/queryAward.dos',
                '十个抽奖纪录171016':base+'activityLottery/queryAwardAll.dos',
                
                
                //myself
                '首页':base+'index/index.dos',
                '新闻详情':base+'aboutus/newsDetails.dos',
                '签到记录':base+'signIn/continuous.dos',
                '是否已签到':base+'signIn/signInYN.dos',
                '点击签到':base+'signIn/clickSignIn.dos',
                '签到积分':base+'integral/IntegralSum.dos',
                '新手福利':base+'member/newMember.do'
            };
            return urls[name];
        }
    })
});