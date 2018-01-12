/* 
 * @Author: lee
 * @Date:   2016-01-23 10:37:01
 * @Last Modified by:   lee
 * @Last Modified time: 2016-01-23 19:16:49
 */

'use strict';
routerApp
/*错误信息*/
    .filter('errorUserMessages', function() {
        return function(name, dialog, scope) {
            var error = {
                noSelect: "请选需要操作的节点!",
                delVerify: "确定要删除节点：",
                loginErro: "登陆失败：",
                netErro: "网络异常：请检查你的网络！"
            };

            return error[name];
        }
    })
    /*修改密码*/
    .filter('resetPswCtrlPhoneError', function() {
        return function(code, name) {
            var error = {
                1001: "此手机号不存在",
                1002: "发送失败"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入手机号';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号无效';
            } else
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号长度错误';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*修改密码-手机验证码*/
    .filter('resetPswCtrlPhoneSmSError', function() {
        return function(code, name) {
            var error = {
                1001: "短信验证失败"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入短信验证码';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.required;
                text = '短信验证失败';
            }
            return text;
        }
    })
    /*登录用户名*/
    .filter('denLuUserNameError', function() {
    	//code为输入，name为筛选条件
        return function(code, name) {
            var error = {
                1001: "账号或密码为空",
                1003: "账号或密码错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入您的手机号';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '此用户名无效';
            } else
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '用户名长度错误';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                //error对象属性名为纯数字，所以此处用的是中括号 而不是点
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*充值最低限额和最高限额的验证*/
    .filter('rechargeLimit', function() {
        return function(viewvalue, min, max) {
            var obj = {
                typemin: true,
                typemax: true
            }
            if (viewvalue < min) {
                obj.typemin = false;
            } else if (viewvalue > max) {
                obj.typemax = false;
            } else {
                obj = {
                    typemin: true,
                    typemax: true
                }
            }
            if (max=='') {
                obj.typemax = true;
            }
            return obj;
        }
    })
    /*登录图片验证*/
    .filter('denLuPicCodeNameError', function() {
        return function(code, name) {
            var error = {
                1002: "图片验证码不正确"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入您的手机号';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '用户名长度错误';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*登录密码验证*/
    .filter('denLuPassWordError', function() {
        return function(code, name) {
            var error = {
                1001: "账号或密码为空",
                1003: "账号或密码错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '密码必须6-18位数字和字母的组合';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '密码必须6-18位数字或字母的组合';
                // console.log('error',code);
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册手机号*/
    .filter('zhuCePhoneError', function() {
        return function(code, name) {
            var error = {
                1001: "此手机号不存在",
                1002: "发送失败",
                1003: "手机号为空 ",
                1007: "手机号已注册 ",
                8888: "此号码已注册"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入需验证的手机号码';
            }
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '无效的手机号码';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码长度错误';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-图文验证*/
    .filter('zhuCePicCodeError', function() {
        return function(code, name) {
            var error = {
                1001: "图片验证码不正确",
                1002: "每个手机号当天只能发送5条,请更换手机",
                1004: "图片验证码不正确"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '验证为空';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '验证码应4位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-手机短信*/
    .filter('zhuCesmsCodeCodeError', function() {
        return function(code, name) {
            var error = {
                1001: "图片验证码不正确",
                1002: "短信验证码错误",
                1003: "短信发送失败"
            };
            var text = '';
            code.$valid = false;
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '验证为空';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '验证码应4位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-密码*/
    .filter('zhuCePassWordError', function() {
        return function(code, name) {
            var error = {
                1005: "密码格式错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '密码未填';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '密码必须是6-18位数字和字母的组合';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-密码*/
    .filter('zhuCeRefereeError', function() {
        return function(code, name) {
            var error = {
                1008: '推荐人不存在'
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入推荐人的手机号码';
            }
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码不正确';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码长度11位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*1001=，1002=，1003=，1004=，1005==，1007=，1009=*/
    /*服务器-errorCode*/
    .filter('确认投资服务器Error', function() {
        return function(code) {
            var error = {
                1001: { text: "交易密码错误，连续输错三次，交易密码将被锁定", classCode: 'error' },
                1002: { text: "产品已募集完", classCode: 'error' },
                1003: { text: "项目可投资金额不足", classCode: 'error' },
                1004: { text: "小于起投金额", classCode: 'error' },
                1005: { text: "非递增金额整数倍", classCode: 'error' },
                1006: { text: "投资金额大于项目单笔投资限额", classCode: 'error' },
                1007: { text: "账户可用余额不足", classCode: 'error' },
                1008: { text: "已投资过产品，不能投资新手产品", classCode: 'error' },
                1009: { text: "用户未登录", classCode: 'error' },
                1010: { text: "优惠券不可用", classCode: 'error' },
                1011: { text: "投资失败，请稍后再试", classCode: 'error' },
                1012: { text: "非首投用户，不能参与投多少送多少活动", classCode: 'error' },
                2001: { text: "交易密码已锁定", classCode: 'error' },
                9999: "系统错误",
                test: "网络错误"
            };
            return error[code];
        };
    })
    /*服务器-errorCode*/
    .filter('服务器信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "账号或密码为空",
                1002: "验证码错误",
                1003: "账号或密码错误",
                9999: "系统错误",
                test: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                scope.msg = {};
                scope.msg.btnYes = '确定';
                scope.msg.btnNo = '忽略';
                scope.msg.title = '警告';
                scope.msg.text = $filter('静态接口对照表')('弹出框模板');
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器获取产品详情-errorCode*/
    .filter('获取产品详情错误', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "产品不存在或下架",
                test: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                scope.msg = {};
                scope.msg.btnYes = '确定';
                scope.msg.btnNo = '忽略';
                scope.msg.title = '警告';
                scope.msg.text = $filter('静态接口对照表')('弹出框模板');
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器-errorCode*/
    .filter('注册服务器error信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "图片验证码不正确",
                1002: "每个手机号当天只能发送5条",
                1003: "短信发送失败",
                9999: "系统错误",
                none: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器-errorCode*/
    .filter('立即注册error信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "短信验证码为空",
                1002: "短信验证码错误",
                1003: "手机号为空",
                1004: "图片验证码为空",
                1005: "密码格式错误",
                1006: "未勾选注册协议",
                1007: "手机号已注册",
                1008: "推荐人不存在",
                9999: "系统错误",
                none: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*身份认证error信息*/
    .filter('身份认证error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '真实姓名不能为空',
                '1002': '身份证号不能为空',
                '1003': '银行卡号不能为空',
                '1004': '手机号码不能为空',
                '1005': '短信验证码不能为空',
                '1006': '短信验证码错误',
                '1007': '银行卡类型不符，请更换银行卡后重试',
                '1008': '此卡未开通银联在线支付功能，实名认证失败，请联系发卡银行',
                '1009': '不支持此银行卡的验证',
                '1010': '免费验证次数已用完，请联系客服人员',
                '1011': '认证失败',
                '1012': '该身份证号已认证',
                '1013': '已认证成功',
                '1014': '请核对个人信息',
                '1015': '请核对银行卡信息',
                '1016': '该银行卡bin不支持',
                '1017': '认证失败，系统异常请稍后再试'
            };
            return error[code];
        };
    })
    /*身份认证获取验证码error信息*/
    .filter('身份认证获取验证码error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1002': '每个手机号当天只能发送5条',
                '1003': '短信发送失败'
            };
            return error[code];
        };
    })
    /* 安全认证修改登录密码error信息 */
    .filter('安全认证修改登录密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '原登录密码不正确',
                '1002': '新密码为空',
                '1003': '新密码和确认密码不一致',
                '1004': '登录密码不合法',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*设置交易密码error信息*/
    .filter('设置交易密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '交易密码为空',
                '1002': '两次交易密码不一致',
                '1003': '已存在交易密码',
                '1004': '格式不正确'
            };
            return error[code];
        };
    })
    /*修改交易密码error信息*/
    .filter('修改交易密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '原交易密码不正确',
                '1002': '短信验证码错误',
                '1003': '交易密码为空',
                '1004': '两次输入不一致',
                '1005': '格式错误',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /* 找回交易密码获取短信验证码error信息 */
    .filter('找回交易密码获取短信验证码error信息', function() {
        return function(code) {
            var error = {
                '1001': '短信发送失败',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*找回交易密码设置新交易密码error信息*/
    .filter('找回交易密码设置新交易密码error信息', function() {
        return function(code) {
            var error = {
                '1002': '短信验证码错误',
                '1003': '交易密码为空',
                '1004': '两次输入不一致',
                '1005': '格式错误'
            };
            return error[code];
        };
    })
    /*充值数据error信息*/
    .filter('充值数据error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*创建订单error信息*/
    .filter('创建订单error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '金额有误',
                '1002': '系统错误，请稍后重试',
                '1003': '超过限额，请修改金额后重试'
            };
            return error[code];
        };
    })
    /*提现数据error信息*/
    .filter('提现数据error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*充值error信息*/
    .filter('充值error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1003': '验证码错误',
                '1004': '处理中',
                '1005': '系统错误，请稍后重试',
                '1006': '超出单卡号累计交易次数限制',
                '1007': '超出银行授信额度',
                '1008': '超过用户在银行设置的限额',
                '1009': '持卡人身份证验证失败',
                '1010': '对不起，您累计交易支付金额超出单笔限额',
                '1011': '对不起，您累计交易支付金额超出当日限额',
                '1012': '对不起，您累计交易支付金额超出当月限额',
                '1013': '非法用户号',
                '1014': '该卡暂不支持支付，请更换其他银行卡重试',
                '1015': '该卡暂不支持支付，请稍后再试',
                '1016': '交易超时',
                '1017': '交易金额不能大于最大限额',
                '1018': '交易金额不能低于最小限额',
                '1019': '交易金额超过渠道当月限额',
                '1020': '交易金额为空',
                '1021': '交易金额有误错误',
                '1022': '交易失败，风险受限',
                '1023': '交易失败，详情请咨询您的发卡行',
                '1024': '金额格式有误',
                '1025': '仅支持个人银行卡支付',
                '1026': '您的银行卡不支持该业务，请与发卡行联系',
                '1027': '请核对个人身份证信息',
                '1028': '请核对您的订单号',
                '1029': '请核对您的个人信息',
                '1030': '请核对您的银行卡信息',
                '1031': '请核对您的银行信息',
                '1032': '请核对您的银行预留手机号',
                '1033': '未开通无卡支付或交易超过限额，详情请咨询您的发卡行',
                '1034': '信息错误，请核对',
                '1035': '银行户名不能为空',
                '1036': '银行卡未开通银联在线支付，请向银行咨询',
                '1037': '银行名称无效',
                '1038': '银行系统繁忙，交易失败，请稍后再提交',
                '1039': '银行账号不能为空',
                '1040': '余额不足',
                '1041': '证件号错误，请核实',
                '1042': '证件号码不能为空',
                '1043': '证件类型与卡号不符',
                '1044': '银行账户余额不足',
                '1045': '交易银行不支持或金额超限'
            };
            return error[code];
        };
    })

/*网银充值error信息*/
.filter('网银充值error信息', function() {
    return function(code) {
        var error = {
            '9999': '系统错误',
            '1001': '充值金额有误',
            '1002': '银行编号不能为空'
        };
        return error[code];
    };
})

/*充值获取验证码error信息*/
.filter('充值获取验证码error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '8888': '频繁操作',
                '1001': '金额有误',
                '1002': '系统错误，请稍后重试',
                '1003': '超过限额，请修改金额后重试',
                '1004': '短信发送失败'
            };
            return error[code];
        };
    })
    /*提现error信息*/
    .filter('提现error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '提现金额有误',
                '1002': '交易密码不能为空',
                '1003': '交易密码错误，连续输错三次，交易密码将被锁定',
                '1004': '余额不足',
                '1005': '交易失败，请再次申请',
                '1006': '处理中',
                '1007': '该笔需要收取手续费',
                '1008': '该笔不需要收取手续费',
                '2001': '交易密码已锁定',
                '2002': '返现或体验金收益需完成一次真实投资后才可提现'
            };
            return error[code];
        };
    })
    .filter('pageFilter', function() {
        return function(page, pageOn) {
            var array = [];
            for (var i = 1; i <= parseInt(page); i++) {
                array.push(i);
            }
            var array2 = [];
            if (page > 5) {
                if (pageOn >= page - 2) {
                    array2 = array.slice(-4);
                } else if (pageOn <=2) {
                    array2 = array.slice(0,4);
                }else{
                    for (var i = pageOn - 2; i < pageOn + 2; i++) {
                        array2.push(i);
                    }
                }
            } else {
                array2 = array.concat([]);
            }
            if(array2[0]>1){array2.unshift('...');}
            if(array2[array.length-1]<page){array2.push('...')};
            return array2;
        }
    })
