/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var define = false;

	__webpack_require__(2);
	__webpack_require__(3);



/***/ },
/* 2 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	var define = false;

	(function (doc, win) {
	    var docEl = doc.documentElement,
	        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function () {
	            var clientWidth = docEl.clientWidth;
	            if (!clientWidth) return;
	            if(clientWidth>=640){
	                docEl.style.fontSize = '100px';
	            }else{
	                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
	            }
	        };

	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);



/***/ },
/* 3 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	var define = false;

	/**
	 * Created by Felix on 2017-03-02.
	 */

	var xdVersion = "1.0";
	// var xdDomain = 'http://localhost:8080/credit-wx/restapi';
	var xdDomain = 'http://192.168.1.50:8080/credit-wx/restapi';
	var fDomain = "http://192.168.1.50:8080/h5-design-repository/xindai-weixin"

	// var xdDomain = 'https://test.nizhaowozu.com/credit-wx/restapi';
	// var fDomain = "https://test.nizhaowozu.com/xindai-weixin"

	// common  start

	//common1  提示信息弹框
	function alertError(info) {
	    $('body').append('<section class="rs-alertLayout"></section><section class="rs-alert">' + info + '</section>');
	    $(".rs-alertLayout,.rs-alert").fadeOut(3000);
	    setTimeout(function () {
	        $(".rs-alertLayout,.rs-alert").remove();
	    }, 3000);
	}

	//common2  解决两位数字做运算出现小数点后多位的bug
	function accAdd(arg1,arg2){
	    var r1,r2,m;
	    try{
	        r1=arg1.toString().split(".")[1].length
	    }catch(e){
	        r1=0
	    }
	    try{
	        r2=arg2.toString().split(".")[1].length
	    }catch(e){
	        r2=0
	    }
	    m=Math.pow(10,Math.max(r1,r2));
	    return (arg1*m+arg2*m)/m;
	}

	//common3  输入金额为小数点后两位
	function clearNoNum(obj){
	  obj.value = obj.value.replace(/[^\d.]/g,"");          //清除“数字”和“.”以外的字符
	  obj.value = obj.value.replace(/\.{2,}/g,".");         //只保留第一个. 清除多余的
	  obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
	  if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
	   obj.value= parseFloat(obj.value);
	  }
	}

	//common4  校验银行卡
	function clearBCNum(obj){
	  obj.value = obj.value.replace(/[^\d]/g,"");          //清除“数字”以外的字符
	}

	function clearIDNum(obj){
	  obj.value = obj.value.replace(/[^\d\x\X]/g,"");          //清除“数字”和“x”“X”以外的字符
	}


	//common5  字符串截取
	function GetQueryString(name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null)return unescape(r[2]);
	  return null;
	}


	//common6  载入loading
	(function(){
		//当所有dom和图片加载完加载脚本
		window.onload = function(){
			animateStop();
		}
	    animateStop();
	})()
	   //animate延时三秒小时
	function animateStop(){
	    setTimeout(function(){
	        //设置动画的不显示
	        $("#lodding_animate").remove();
	        $(".lodding_animate").attr("id","loading_animate");
	    },3000)
	}
	   //animateStop();

	// common7   身份认证无效、过期跳转登录页面
	function clearToLogin(){
	  localStorage.clear();
	  window.location.href = "xd-login.html";
	}

	// common8  验证身份证号的正则
	    //身份证号合法性验证
	    //支持15位和18位身份证号
	    //支持地址编码、出生日期、校验位验证
	function IdentityCodeValid(code) {
	  var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	  var tip = "";
	  var pass= true;

	  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
	    tip = "身份证号不正确";
	    pass = false;
	  }
	  else if(!city[code.substr(0,2)]){
	    tip = "身份证号不正确";
	    pass = false;
	  }
	  else{
	    //18位身份证需要验证最后一位校验位
	    if(code.length == 18){
	      code = code.split('');
	      //∑(ai×Wi)(mod 11)
	      //加权因子
	      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	      //校验位
	      var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
	      var sum = 0;
	      var ai = 0;
	      var wi = 0;
	      for (var i = 0; i < 17; i++){
	        ai = code[i];
	        wi = factor[i];
	        sum += ai * wi;
	      }
	      var last = parity[sum % 11];
	      if(parity[sum % 11] != code[17]){
	        tip = "身份证号不正确";
	        pass =false;
	      }
	    }
	  }
	  if(!pass) alertError(tip);
	  return pass;
	}

	// common  end



	//login controller
	var login = angular.module('loginDetail', [], function ($httpProvider) {
	    // Use x-www-form-urlencoded Content-Type
	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	    /**
	     * The workhorse; converts an object to x-www-form-urlencoded serialization.
	     * @param {Object} obj
	     * @return {String}
	     */
	    var param = function (obj) {
	        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	        for (name in obj) {
	            value = obj[name];

	            if (value instanceof Array) {
	                for (i = 0; i < value.length; ++i) {
	                    subValue = value[i];
	                    fullSubName = name + '[' + i + ']';
	                    innerObj = {};
	                    innerObj[fullSubName] = subValue;
	                    query += param(innerObj) + '&';
	                }
	            }
	            else if (value instanceof Object) {
	                for (subName in value) {
	                    subValue = value[subName];
	                    fullSubName = name + '[' + subName + ']';
	                    innerObj = {};
	                    innerObj[fullSubName] = subValue;
	                    query += param(innerObj) + '&';
	                }
	            }
	            else if (value !== undefined && value !== null)
	                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	        }

	        return query.length ? query.substr(0, query.length - 1) : query;
	    };

	    // Override $http service's default transformRequest
	    $httpProvider.defaults.transformRequest = [function (data) {
	        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	    }];
	});

	login.controller('loginCtrl', function ($scope, $http) {
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  if (xdAccessKey == "" || xdAccessKey == null) {
	    // login Button
	    $scope.loginSub = function(){
	      var idNum = $('#idNum').val();
	      if(idNum.indexOf('x')>0){
	        idNum = idNum.replace('x','X');
	      }
	      var pwd = $('#pwd').val();
	      if(idNum != "" && pwd !=""){
	        $http({
	          url: xdDomain + '/user/login',
	          method: "post",
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          data: {
	            api_version: xdVersion,
	            loginname: idNum,
	            password: pwd
	          }
	        }).success(function (response) {
	          if (response.code == "000000000") {
	            localStorage.setItem('xdAccessKey',response.data.access_key)
	            window.location.href="xd-index.html"
	          }
	          else {
	            alertError(response.message);
	          }
	        });
	      }
	      else if(idNum == ""&&pwd == ""){
	        alertError("请输入用户名和密码")
	      }
	      else if(idNum == ""){
	        alertError("请输入用户名")
	      }
	      else if(pwd == ""){
	        alertError("请输入密码")
	      }

	    }
	  }else{
	    window.location.href="xd-index.html";
	    $http({
	      url: xdDomain + '/user/info/query',
	      method: "post",
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      data: {
	        api_version: xdVersion,
	        access_key: xdAccessKey
	      }
	    }).success(function (response) {
	      if (response.code == "000000000") {
	          $scope.custInfo = response.data;
	          localStorage.setItem('xdCustName',response.data.custname);
	          localStorage.setItem('xdIdNo',response.data.card_id);
	          if(response.data.loan_id != ""){
	              localStorage.setItem('xdLoadId',response.data.loan_id);
	          }
	          else{
	              $(".noContract").removeClass("hide");
	              $(".hasContract").addClass("hide");
	              alertError("您在我公司办理的借款合同已全部结清");
	          }
	      }
	      else if (response.code == "000002001" || response.code == "000002002") {
	        clearToLogin();
	      }
	      else {
	        alertError(response.message);
	          //window.location.href="xd-login.html";
	      }
	    });
	  }
	})


	// activate
	var activate = angular.module('activate', [], function ($httpProvider) {
	   // Use x-www-form-urlencoded Content-Type
	   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	   /**
	    * The workhorse; converts an object to x-www-form-urlencoded serialization.
	    * @param {Object} obj
	    * @return {String}
	    */
	   var param = function (obj) {
	       var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	       for (name in obj) {
	           value = obj[name];

	           if (value instanceof Array) {
	               for (i = 0; i < value.length; ++i) {
	                   subValue = value[i];
	                   fullSubName = name + '[' + i + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value instanceof Object) {
	               for (subName in value) {
	                   subValue = value[subName];
	                   fullSubName = name + '[' + subName + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value !== undefined && value !== null)
	               query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	       }

	       return query.length ? query.substr(0, query.length - 1) : query;
	   };

	   // Override $http service's default transformRequest
	   $httpProvider.defaults.transformRequest = [function (data) {
	       return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	   }];
	});

	activate.controller('activateCtrl', function ($scope, $http) {
	  // send verification code
	  $scope.getCheckCode = function(){
	    var mobile = $('#mobile').val();

	    var mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	    if (mobileReg.test(mobile)) {
	      $http({
	        url: xdDomain + '/sms/code/send',
	        method: "post",
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        data: {
	          api_version: xdVersion,
	          mobile: mobile
	        }
	      }).success(function (response) {
	        if (response.code == "000000000") {
	          $('.getCheckCode').attr("disabled", "true");
	          // 设置button效果，开始计时
	          var curCount = 120;
	          var InterValObj = window.setInterval(SetRemainTime, 1000);
	          function SetRemainTime() {
	            if (curCount == 1) {
	              window.clearInterval(InterValObj);             //停止计时器
	              $('.getCheckCode').removeAttr("disabled");                //启用按钮
	              $('.getCheckCode').attr("style", "color:#169fff;");
	              $('.getCheckCode').val("重新发送");
	            }
	            else {
	              curCount--;
	              $('.getCheckCode').val("请在" + curCount + "秒内输入");
	              $('.getCheckCode').attr("style", "color:#666;");
	            }
	          }
	        }
	        else {
	          alertError(response.message);
	        }
	      });
	    }else {
	      alertError('请输入正确的手机号');
	    }
	  }
	  // active Button
	  $scope.activeSub = function(){
	    var loginName = $('#loginName').val();
	    if(loginName.indexOf('x')>0){
	      loginName = loginName.replace('x','X');
	    }
	    var mobile = $('#mobile').val();
	    var checkCode = $('#checkCode').val();
	    var password = $('#password').val();
	    var rePwd = $('#rePwd').val();
	    if (
	        loginName != "" &&
	        mobile != "" &&
	        checkCode != "" &&
	        password != "" &&
	        rePwd != ""
	      ) {
	        if(loginName.length == 18 && IdentityCodeValid(loginName)){
	          var mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	          if (mobileReg.test(mobile)) {
	            if (password == rePwd) {
	              if (password.length > 5 && password.length < 17) {
	                $http({
	                  url: xdDomain + '/user/actived',
	                  method: "post",
	                  headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                  },
	                  data: {
	                    api_version: xdVersion,
	                    loginname: loginName,
	                    mobile: mobile,
	                    checkcode: checkCode,
	                    password: password,
	                    re_password: rePwd
	                  }
	                }).success(function (response) {
	                  if (response.code == "000000000") {
	                    window.location.href="xd-login.html"
	                  }
	                  else {
	                    alertError(response.message);
	                  }
	                });
	              }
	              else {
	                alertError("密码为6到16位的字母或数字");
	              }
	            }
	            else {
	              alertError("两次密码不一致！");
	            }
	          }else {
	            alertError('请输入正确的手机号');
	          }
	        }else {
	          alertError("请输入正确的身份证号！");
	        }
	      }
	      else {
	        alertError("必填项为空");
	        $('input').addClass('invalid');
	        $('input').focus(function() {
	          $(this).removeClass('invalid');
	        });
	      }
	  }
	})


	// forgetPwd
	var forgetPwd = angular.module('forgetPwd', [], function ($httpProvider) {
	   // Use x-www-form-urlencoded Content-Type
	   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	   /**
	    * The workhorse; converts an object to x-www-form-urlencoded serialization.
	    * @param {Object} obj
	    * @return {String}
	    */
	   var param = function (obj) {
	       var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	       for (name in obj) {
	           value = obj[name];

	           if (value instanceof Array) {
	               for (i = 0; i < value.length; ++i) {
	                   subValue = value[i];
	                   fullSubName = name + '[' + i + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value instanceof Object) {
	               for (subName in value) {
	                   subValue = value[subName];
	                   fullSubName = name + '[' + subName + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value !== undefined && value !== null)
	               query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	       }

	       return query.length ? query.substr(0, query.length - 1) : query;
	   };

	   // Override $http service's default transformRequest
	   $httpProvider.defaults.transformRequest = [function (data) {
	       return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	   }];
	});

	forgetPwd.controller('forgetPwdCtrl', function ($scope, $http) {
	  // send verification code
	  $scope.getCheckCode = function(){
	    var mobile = $('#mobile').val();

	    var mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	    if (mobileReg.test(mobile)) {
	      $http({
	        url: xdDomain + '/sms/code/send',
	        method: "post",
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        data: {
	          api_version: xdVersion,
	          mobile: mobile
	        }
	      }).success(function (response) {
	        if (response.code == "000000000") {
	          $('.getCheckCode').attr("disabled", "true");
	          // 设置button效果，开始计时
	          var curCount = 120;
	          var InterValObj = window.setInterval(SetRemainTime, 1000);
	          function SetRemainTime() {
	            if (curCount == 1) {
	              window.clearInterval(InterValObj);             //停止计时器
	              $('.getCheckCode').removeAttr("disabled");                //启用按钮
	              $('.getCheckCode').attr("style", "color:#169fff;");
	              $('.getCheckCode').val("重新发送");
	            }
	            else {
	              curCount--;
	              $('.getCheckCode').val("请在" + curCount + "秒内输入");
	              $('.getCheckCode').attr("style", "color:#666;");
	            }
	          }
	        }
	        else {
	          alertError(response.message);
	        }
	      });
	    }else {
	      alertError('请输入正确的手机号');
	    }
	  }
	  // forgetPwd Button
	  $scope.forgetPwdSub = function(){
	    var loginName = $('#loginName').val();
	    if(loginName.indexOf('x')>0){
	      loginName = loginName.replace('x','X');
	    }
	    var mobile = $('#mobile').val();
	    var checkCode = $('#checkCode').val();
	    var password = $('#password').val();
	    var rePwd = $('#rePwd').val();
	    if (
	        loginName != "" &&
	        mobile != "" &&
	        checkCode != "" &&
	        password != "" &&
	        rePwd != ""
	      ) {
	        if(loginName.length == 18 && IdentityCodeValid(loginName)){
	          var mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	          if (mobileReg.test(mobile)) {
	            if (password == rePwd) {
	              if (password.length > 5 && password.length < 17) {
	                $http({
	                  url: xdDomain + '/user/password/reset',
	                  method: "post",
	                  headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                  },
	                  data: {
	                    api_version: xdVersion,
	                    loginname: loginName,
	                    mobile: mobile,
	                    checkcode: checkCode,
	                    password: password,
	                    re_password: rePwd
	                  }
	                }).success(function (response) {
	                  if (response.code == "000000000") {
	                    window.location.href="xd-login.html"
	                  }
	                  else {
	                    alertError(response.message);
	                  }
	                });
	              }
	              else {
	                alertError("密码为6到16位的字母或数字");
	              }
	            }
	            else {
	              alertError("两次密码不一致！");
	            }
	          }else {
	            alertError('请输入正确的手机号');
	          }
	        }else {
	          alertError("请输入正确的身份证号！");
	        }
	      }
	      else {
	        alertError("必填项为空");
	        $('input').addClass('invalid');
	        $('input').focus(function() {
	          $(this).removeClass('invalid');
	        });
	      }
	  }
	})


	// xd-index.html
	var indexInfo = angular.module('indexInfo', [], function ($httpProvider) {
	   // Use x-www-form-urlencoded Content-Type
	   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	   /**
	    * The workhorse; converts an object to x-www-form-urlencoded serialization.
	    * @param {Object} obj
	    * @return {String}
	    */
	   var param = function (obj) {
	       var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	       for (name in obj) {
	           value = obj[name];

	           if (value instanceof Array) {
	               for (i = 0; i < value.length; ++i) {
	                   subValue = value[i];
	                   fullSubName = name + '[' + i + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value instanceof Object) {
	               for (subName in value) {
	                   subValue = value[subName];
	                   fullSubName = name + '[' + subName + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value !== undefined && value !== null)
	               query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	       }

	       return query.length ? query.substr(0, query.length - 1) : query;
	   };

	   // Override $http service's default transformRequest
	   $httpProvider.defaults.transformRequest = [function (data) {
	       return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	   }];
	});

	indexInfo.controller('indexInfoCtrl', function ($scope, $http) {
	  // indexInfo
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  $http({
	    url: xdDomain + '/user/info/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	        $scope.custInfo = response.data;
	        localStorage.setItem('xdCustName',response.data.custname);
	        localStorage.setItem('xdIdNo',response.data.card_id);
	        if(response.data.loan_id != ""){
	            localStorage.setItem('xdLoadId',response.data.loan_id);
	        }
	        else{
	            $(".noContract").removeClass("hide");
	            $(".hasContract").addClass("hide");
	            alertError("您在我公司办理的借款合同已全部结清");
	        }

	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	        //window.location.href="xd-login.html";
	    }
	  });
	})

	indexInfo.controller('repayInfoCtrl', function ($scope, $http) {
	  // rePayInfo
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  setTimeout(function(){
	    var xdLoadId = localStorage.getItem('xdLoadId');
	    $http({
	      url: xdDomain + '/credit/repay/info/query',
	      method: "post",
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      data: {
	        api_version: xdVersion,
	        access_key: xdAccessKey,
	        loan_id: xdLoadId
	      }
	    }).success(function (response) {
	      if (response.code == "000000000") {
	          $scope.rpInfo = response.data;
	        $scope.toSettlement=function($event){
	            localStorage.setItem("xdStatus",$event.target.id);
	            window.location.href="xd-settlement.html"
	        }
	      }
	      else if (response.code == "000002001" || response.code == "000002002") {
	        clearToLogin();
	      }
	      else {
	        alertError(response.message);
	      }
	    });
	  },300)
	})

	indexInfo.controller('waitPayCtrl', function ($scope, $http) {
	  // waitPayCtrl
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  $http({
	    url: xdDomain + '/credit/arrears/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      for(var i = 0;i<response.data.noPayOffPeriods.length;i++){
	        var n1 = response.data.noPayOffPeriods[i].shouldPay;
	        var n2 = response.data.noPayOffPeriods[i].shouldfoul;
	        var n3 = response.data.noPayOffPeriods[i].shouldafine;
	        var sum = accAdd(parseFloat(n1),parseFloat(n2));
	        var total = accAdd(parseFloat(sum),parseFloat(n3));

	        var wpArr = response.data.noPayOffPeriods;
	        wpArr[i].shouldTotal = total;
	      }
	      $scope.wp = wpArr;
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	    }

	    //设置loading_animate不显示
	//  var loading_animate = document.getElementById("lodding_animate");
	//  loading_animate.style.display = "none";
	  });

	  $scope.toggle = function($event){
	    if(!$($($event.target)).parents('li').find(".detail").is(":visible")){
	      $($($event.target)).parents('li').find('.waitPayDetail').css({
	        'transform':'rotate(180deg)',
	        'transform-origin':'0.11rem 50%'
	      });
	      $($($event.target)).parents('li').height('2.04rem');
	      var bgColor = $($($event.target)).parents('li').css('background-color');
	      $($($event.target)).parents('li').children('.detail').css('display','block');
	      $($($event.target)).parents('li').find('.detail').css('border-bottom','1px dashed #e6e6e6');
	      $($($event.target)).parents('li').find('.detail').css('background',bgColor);
	    }else{
	      $($($event.target)).parents('li').find('.waitPayDetail').css({
	        'transform':'rotate(0deg)',
	        'transform-origin':'0.11rem 50%'
	      });
	      $($($event.target)).parents('li').height('0.68rem');
	      $($($event.target)).parents('li').children('.detail').css('display','none');
	    }
	  }
	})

	indexInfo.controller('rePayCtrl', function ($scope, $http) {
	  // rePayCtrl
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  $http({
	    url: xdDomain + '/credit/history/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      for(var i = 0;i<response.data.payOffPeriods.length;i++){
	        var n1 = response.data.payOffPeriods[i].realPay;
	        var n2 = response.data.payOffPeriods[i].realfoul;
	        var n3 = response.data.payOffPeriods[i].realafine;
	        var sum = accAdd(parseFloat(n1),parseFloat(n2));
	        var total = accAdd(parseFloat(sum),parseFloat(n3));

	        var rpArr = response.data.payOffPeriods;
	        rpArr[i].realTotal = total;
	      }
	      $scope.rp = rpArr;
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	    }
	  });

	  $scope.toggle = function($event){
	    if(!$($($event.target)).parents('li').find(".detail").is(":visible")){
	      $($($event.target)).parents('li').find('.waitPayDetail').css({
	        'transform':'rotate(180deg)',
	        'transform-origin':'0.11rem 50%'
	      });
	      $($($event.target)).parents('li').height('2.04rem');
	      var bgColor = $($($event.target)).parents('li').css('background-color');
	      $($($event.target)).parents('li').children('.detail').css('display','block');
	      $($($event.target)).parents('li').find('.detail').css('border-bottom','1px dashed #e6e6e6');
	      $($($event.target)).parents('li').find('.detail').css('background',bgColor);
	    }else{
	      $($($event.target)).parents('li').find('.waitPayDetail').css({
	        'transform':'rotate(0deg)',
	        'transform-origin':'0.11rem 50%'
	      });
	      $($($event.target)).parents('li').height('0.68rem');
	      $($($event.target)).parents('li').children('.detail').css('display','none');
	    }
	  }
	})

	// xd-overdueSettlement.html
	var overdue = angular.module('overdue', [], function ($httpProvider) {
	   // Use x-www-form-urlencoded Content-Type
	   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	   /**
	    * The workhorse; converts an object to x-www-form-urlencoded serialization.
	    * @param {Object} obj
	    * @return {String}
	    */
	   var param = function (obj) {
	       var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	       for (name in obj) {
	           value = obj[name];

	           if (value instanceof Array) {
	               for (i = 0; i < value.length; ++i) {
	                   subValue = value[i];
	                   fullSubName = name + '[' + i + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value instanceof Object) {
	               for (subName in value) {
	                   subValue = value[subName];
	                   fullSubName = name + '[' + subName + ']';
	                   innerObj = {};
	                   innerObj[fullSubName] = subValue;
	                   query += param(innerObj) + '&';
	               }
	           }
	           else if (value !== undefined && value !== null)
	               query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	       }

	       return query.length ? query.substr(0, query.length - 1) : query;
	   };

	   // Override $http service's default transformRequest
	   $httpProvider.defaults.transformRequest = [function (data) {
	       return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	   }];
	});

	overdue.controller('overdueCtrl', function ($scope, $http, $compile) {
	  // overdue
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  var xdLoadId = localStorage.getItem('xdLoadId');
	    var xdStatus=localStorage.getItem('xdStatus');
	    if(xdStatus == null || xdStatus ==""){
	        window.location.href="xd-index.html"
	    }
	    else{
	        $("."+xdStatus).removeClass("hide");
	    }
	    $http({
	    url: xdDomain + '/credit/repay/info/overdue/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey,
	      loan_id: xdLoadId
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      $scope.overdueInfo = response.data;
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else if (response.code == "003004001") {

	    }
	    else {
	      alertError(response.message);
	    }
	  });
	})

	overdue.controller('normalCtrl', function ($scope, $http) {
	  // normal
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  var xdLoadId = localStorage.getItem('xdLoadId');
	  $http({
	    url: xdDomain + '/credit/repay/info/normal/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey,
	      loan_id: xdLoadId
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      $scope.normalInfo = response.data;
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	    }
	  });
	})

	overdue.controller('earlyCtrl', function ($scope, $http) {
	  // early
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  var xdLoadId = localStorage.getItem('xdLoadId');
	  $http({
	    url: xdDomain + '/credit/repay/info/before/query',
	    method: "post",
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey,
	      loan_id: xdLoadId
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      $scope.earlyInfo = response.data;
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	    }
	  });
	})

	overdue.controller('addBCCtrl', function ($scope, $http) {
	    // enabledBankList
	    var xdAccessKey = localStorage.getItem('xdAccessKey');
	    $http({
	        url: xdDomain + '/payment/bankinfolist/inuse/query',
	        method: "post",
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        data: {
	            api_version: xdVersion,
	            access_key: xdAccessKey
	        }
	    }).success(function (response) {
	        if (response.code == "000000000") {
	            $scope.addBC = response.data.bankInfoList;
	        }
	        else if (response.code == "000002001" || response.code == "000002002") {
	          // clearToLogin();
	        }
	        else {
	            alertError(response.message);
	        }
	    });
	})

	overdue.controller('queryBankInfo', function ($scope, $http) {
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  $http({
	    url: xdDomain + '/payment/cardbindinfo/query',
	    method: "post",
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {
	      api_version: xdVersion,
	      access_key: xdAccessKey
	    }
	  }).success(function (response) {
	    if (response.code == "000000000") {
	      if(response.data.cardBindInfoList.length != 0){
	        $('.bankCardNum').val("");

	        var cardBind = response.data.cardBindInfoList;
	        for(var i = 0;i<response.data.cardBindInfoList.length;i++){
	          if(cardBind[i].isDefault == "1"){
	            cardBind[i].class = "alreadySel";
	          }
	        }
	        $scope.cardBindInfo = cardBind;

	        // localStorage.setItem('noAgree',response.data.cardBindInfoList[0].noAgree);
	        //
	        // var arrBankInfo=[];
	        // for(var i=0;i<response.data.cardBindInfoList.length;i++){
	        //   var cardBindInfoArr = response.data.cardBindInfoList;
	        //   var xdBankCardNum = cardBindInfoArr[i].cardNo;
	        //   // "use strict";
	        //   // let j = i;
	        //   (function(){
	        //     $http({
	        //       url: xdDomain + '/payment/bankinfo/cardno/query',
	        //       method: "post",
	        //       headers: {
	        //         'Content-Type': 'application/x-www-form-urlencoded'
	        //       },
	        //       data: {
	        //         api_version: xdVersion,
	        //         access_key: xdAccessKey,
	        //         cardNo: xdBankCardNum
	        //       }
	        //     }).success(function (response) {
	        //       if (response.code == "000000000") {
	        //         arrBankInfo[i] = response.data.bankInfo;
	        //         localStorage.setItem('bankCardInfo'+i,JSON.stringify(response.data.bankInfo));
	        //       }
	        //       else if (response.code == "000002001" || response.code == "000002002") {
	        //         clearToLogin();
	        //       }
	        //       else {
	        //         alertError(response.message);
	        //       }
	        //     });
	        //   })(i);
	        // }
	      }else {
	        $('.bankCardNum').val("");
	      }
	    }
	    else if (response.code == "000002001" || response.code == "000002002") {
	      clearToLogin();
	    }
	    else {
	      alertError(response.message);
	    }
	  });
	})

	overdue.controller('settlement', function ($scope, $http, $compile) {
	  var xdStatus=localStorage.getItem('xdStatus');
	  if(xdStatus == "xd-overdue"){
	    $scope.pageTitle = "逾期还款";
	  }else if (xdStatus == "xd-repay") {
	    $scope.pageTitle = "正常还款";
	  }else {
	    $scope.pageTitle = "提前还款";
	  }
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  // 根据用户是否有绑卡信息跳转不同页面
	  // $scope.toBankCard = function(){
	  //   // 查询用户绑卡信息
	  //   $http({
	  //     url: xdDomain + '/payment/cardbindinfo/query',
	  //     method: "post",
	  //     headers: {
	  //       'Content-Type': 'application/x-www-form-urlencoded'
	  //     },
	  //     data: {
	  //       api_version: xdVersion,
	  //       access_key: xdAccessKey
	  //     }
	  //   }).success(function (response) {
	  //     if (response.code == "000000000") {
	  //       if(response.data.cardBindInfoList.length != 0){
	  //         localStorage.setItem('noAgree',response.data.cardBindInfoList[0].noAgree);
	  //         var arrBankInfo=[];
	  //         // for(var i=0;i<response.data.cardBindInfoList.length;i++){
	  //         //   var cardBindInfoArr = response.data.cardBindInfoList;
	  //         //   var xdBankCardNum = cardBindInfoArr[i].cardNo;
	  //         //   // "use strict";
	  //         //   // let j = i;
	  //         //   (function(){
	  //         //     $http({
	  //         //       url: xdDomain + '/payment/bankinfo/cardno/query',
	  //         //       method: "post",
	  //         //       headers: {
	  //         //         'Content-Type': 'application/x-www-form-urlencoded'
	  //         //       },
	  //         //       data: {
	  //         //         api_version: xdVersion,
	  //         //         access_key: xdAccessKey,
	  //         //         cardNo: xdBankCardNum
	  //         //       }
	  //         //     }).success(function (response) {
	  //         //       if (response.code == "000000000") {
	  //         //         arrBankInfo[i] = response.data.bankInfo;
	  //         //         localStorage.setItem('bankCardInfo'+i,JSON.stringify(response.data.bankInfo));
	  //         //       }
	  //         //       else if (response.code == "000002001" || response.code == "000002002") {
	  //         //         clearToLogin();
	  //         //       }
	  //         //       else {
	  //         //         alertError(response.message);
	  //         //       }
	  //         //     });
	  //         //   })(i);
	  //         //   var bankCardInfo = localStorage.getItem('bankCardInfo'+i);
	  //         //   cardBindInfoArr[i].bankCardName = JSON.parse(bankCardInfo).bankName;
	  //         //   cardBindInfoArr[i].perApplyLimit = JSON.parse(bankCardInfo).perApplyLimit;
	  //         //   cardBindInfoArr[i].perDayLimit = JSON.parse(bankCardInfo).perDayLimit;
	  //         //   if(cardBindInfoArr[i].isDefault == 1){
	  //         //     cardBindInfoArr[i].alreadySel = "√";
	  //         //     cardBindInfoArr[i].class = "alreadySel";
	  //         //     cardBindInfoArr[i].static = "默认";
	  //         //   }else {
	  //         //     cardBindInfoArr[i].alreadySel = "";
	  //         //     cardBindInfoArr[i].class = "";
	  //         //     cardBindInfoArr[i].static = "";
	  //         //   }
	  //         // }
	  //         // $scope.cardBindInfo = cardBindInfoArr;
	  //
	  //         $('.xd-mask').removeClass('hide');
	  //         $('.selectBankCard').removeClass('hide');
	  //         $('.selectBankCard').css({
	  //           'position': 'absolute',
	  //           'top': '0',
	  //           'left': '0',
	  //           'zIndex': '50',
	  //         });
	  //         $('.addNo').on('click',function(){
	  //           $('.addBankCard').addClass('hide');
	  //           $('.selectBankCard').removeClass('hide');
	  //           $('.selectBankCard').css({
	  //             'position': 'absolute',
	  //             'top': '0',
	  //             'left': '0',
	  //             'zIndex': '50',
	  //           });
	  //         })
	  //       }else {
	  //         $('.selectBankCard').addClass('hide');
	  //         $('.xd-mask').removeClass('hide');
	  //         $('.addBankCard').removeClass('hide');
	  //         $('.custName').html(localStorage.getItem('xdCustName'));
	  //         $('.backCardNo').val("");
	  //         $('.addBankCard').css({
	  //           'position': 'absolute',
	  //           'top': '0',
	  //           'left': '0',
	  //           'zIndex': '51',
	  //         });
	  //         $('.addNo').on('click',function(){
	  //           $('.addBankCard').addClass('hide');
	  //           $('.xd-mask').addClass('hide');
	  //         })
	  //       }
	  //     }
	  //     else if (response.code == "000002001" || response.code == "000002002") {
	  //       clearToLogin();
	  //     }
	  //     else {
	  //       alertError(response.message);
	  //     }
	  //   });
	  // }
	  $scope.selectCard = function($event){
	    $($event.target).siblings('.selectBox').find('span').html('√');
	    $($event.target).parents('.cardInfoLi').siblings('li').children('.selectBox').find('span').html(' ');
	    $($event.target).siblings('.selectBox').find('span').addClass('alreadySel').parents('.cardInfoLi').siblings('li').children('.selectBox').find('span').removeClass('alreadySel');
	  }


	  // 根据卡号查询银行信息(查询新绑定银行卡的银行信息)
	  $scope.returnBankInfo = function(){
	    var xdBankCardNum = $('.backCardNo').val();
	    if(xdBankCardNum != ""){
	      $http({
	        url: xdDomain + '/payment/bankinfo/cardno/query',
	        method: "post",
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        data: {
	          api_version: xdVersion,
	          access_key: xdAccessKey,
	          cardNo: xdBankCardNum
	        }
	      }).success(function (response) {
	        if (response.code == "000000000") {
	          $('.bankCardNum').val(xdBankCardNum);
	          $('.BCName').html(response.data.bankInfo.bankName);
	          $('.perLimit').removeClass('hide');
	          $('.perApply').html(response.data.bankInfo.perApplyLimit);
	          $('.perDay').html(response.data.bankInfo.perDayLimit);
	          $('.xd-mask').addClass('hide');
	          $('.selectBankCard').addClass('hide');
	          $('.addBankCard').addClass('hide');
	          $('.cardInfo').append($compile('<li class="cardInfoLi"><div class="cardInfoLiMASK" ng-click="selectCard($event)"></div><img src="images/bank/'+ response.data.bankInfo.bankCode +'.png" alt="" style="margin:0 0.19rem;"/><p><span class="perApplyLimit hide">'+ response.data.bankInfo.perApplyLimit +'</span><span class="perDayLimit hide">'+ response.data.bankInfo.perDayLimit +'</span><span class="bankCardName">'+ response.data.bankInfo.bankName +'</span><i class="cardNum">'+ xdBankCardNum +'</i></p><div class="selectBox"><span class="alreadySel"></span><i></i></div></li>')($scope));
	          // $('.cardInfo').append($compile(`<li class="cardInfoLi"><div class="cardInfoLiMASK" ng-click="selectCard($event)"></div><img src="images/bank/${response.data.bankInfo.bankCode}.png" alt="" style="margin:0 0.19rem;"/><p><span class="perApplyLimit hide">${response.data.bankInfo.perApplyLimit}</span><span class="perDayLimit hide">${response.data.bankInfo.perDayLimit}</span><span class="bankCardName">${response.data.bankInfo.bankName}</span><i class="cardNum">${xdBankCardNum}</i></p><div class="selectBox"><span class='alreadySel'></span><i></i></div></li>`)($scope));
	        }
	        else if (response.code == "000002001" || response.code == "000002002") {
	          clearToLogin();
	        }
	        else {
	          alertError(response.message);
	        }
	      });
	    }else {
	      alertError("请输入正确的银行卡号");
	    }
	  }
	})

	overdue.controller('payCtrl', function ($scope, $http) {
	  var xdAccessKey = localStorage.getItem('xdAccessKey');
	  $scope.paySub = function () {
	    var idNo = localStorage.getItem('xdIdNo');
	    if(idNo.indexOf('x')>0){
	      idNo = idNo.replace('x','X');
	    }
	    var acctName = localStorage.getItem('xdCustName');
	    var noAgree = localStorage.getItem('noAgree');
	    var urlReturn =fDomain+ '/xd-index.html';
	    // var urlReturn = 'http://localhost:8080/h5-design-repository/xindai-weixin/xd-index.html?access_key='+xdAccessKey;

	    var payMoney = $(".ng-scope.earlySetAccount:not(:hidden)").find(".payMoney").val();
	    if(payMoney !="" && payMoney>0){
	      if($(".bankCardNum").val() !=""){
	        var cardNo = $('.bankCardNum').val();
	        console.log(cardNo);
	        if($(".ng-scope.earlySetAccount:not(:hidden)").find(".payMoney").attr("readonly") == "readonly"){
	          ///payment/quickpay/ahead 提前
	          $http({
	             url: xdDomain + '/payment/quickpay/ahead',
	             method: "post",
	             headers: {
	               'Content-Type': 'application/x-www-form-urlencoded'
	             },
	             data: {
	               api_version: xdVersion,
	               access_key: xdAccessKey,
	               money_order: payMoney,
	              //  no_agree: noAgree,
	               id_no: idNo,
	               acct_name: acctName,
	               card_no: cardNo,
	               url_return: urlReturn
	             }
	          }).success(function (response) {
	             if (response.code == "000000000") {
	               var postData = response.data.req_data;
	               $("#req_data").val(JSON.stringify(postData));
	               $("#payForm").attr("action", "https://wap.lianlianpay.com/authpay.htm");
	               $("#payForm").submit();
	             }
	             else if (response.code == "000002001" || response.code == "000002002") {
	               clearToLogin();
	             }
	             else {
	               alertError(response.message);
	             }
	          });
	        }
	        else{
	          // 获取提前结清所需金额总数
	          var xdLoadId = localStorage.getItem('xdLoadId');
	          $http({
	            url: xdDomain + '/credit/repay/info/before/query',
	            method: "post",
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded'
	            },
	            data: {
	              api_version: xdVersion,
	              access_key: xdAccessKey,
	              loan_id: xdLoadId
	            }
	          }).success(function (response) {
	            if (response.code == "000000000") {
	              var payTotalMoney = response.data.repay_before_amt;
	              if(parseFloat(payMoney) > parseFloat(payTotalMoney)){
	                var cardNo = $('.bankCardNum').val();
	                $('.xd-MASK').removeClass('hide');
	                $('.xd-LAYOUT').removeClass('hide');
	                $('.content span').html(payMoney);
	                $('.content2 span').html(payTotalMoney);
	                $('.xd-LAYOUTSubNo').click(function(){
	                  $('.xd-MASK').addClass('hide');
	                  $('.xd-LAYOUT').addClass('hide');
	                })
	                $('.aheadSub').click(function(){
	                  $http({
	                     url: xdDomain + '/payment/quickpay/ahead',
	                     method: "post",
	                     headers: {
	                       'Content-Type': 'application/x-www-form-urlencoded'
	                     },
	                     data: {
	                       api_version: xdVersion,
	                       access_key: xdAccessKey,
	                       money_order: payTotalMoney,
	                      //  no_agree: noAgree,
	                       id_no: idNo,
	                       acct_name: acctName,
	                       card_no: cardNo,
	                       url_return: urlReturn
	                     }
	                  }).success(function (response) {
	                     if (response.code == "000000000") {
	                       var postData = response.data.req_data;
	                       $("#req_data").val(JSON.stringify(postData));
	                       $("#payForm").attr("action", "https://wap.lianlianpay.com/authpay.htm");
	                       $("#payForm").submit();
	                     }
	                     else if (response.code == "000002001" || response.code == "000002002") {
	                       clearToLogin();
	                     }
	                     else {
	                       alertError(response.message);
	                     }
	                  });
	                })
	              }
	              else{
	                ///payment/quickpay/normal 正常、逾期
	                var cardNo = $('.bankCardNum').val();
	                $http({
	                   url: xdDomain + '/payment/quickpay/normal',
	                   method: "post",
	                   headers: {
	                     'Content-Type': 'application/x-www-form-urlencoded'
	                   },
	                   data: {
	                     api_version: xdVersion,
	                     access_key: xdAccessKey,
	                     money_order: payMoney,
	                    //  no_agree: noAgree,
	                     id_no: idNo,
	                     acct_name: acctName,
	                     card_no: cardNo,
	                     url_return: urlReturn
	                   }
	                }).success(function (response) {
	                   if (response.code == "000000000") {
	                     //  undefined  line1031 line1087
	                      var postData = response.data.req_data;
	                      $("#req_data").val(JSON.stringify(postData));
	                      $("#payForm").attr("action", "https://wap.lianlianpay.com/authpay.htm");
	                      $("#payForm").submit();
	                   }else if (response.code == "004004005") {

	                   }
	                   else if (response.code == "000002001" || response.code == "000002002") {
	                     clearToLogin();
	                   }
	                   else {
	                     alertError(response.message);
	                   }
	                });
	              }
	            }
	            else if (response.code == "000002001" || response.code == "000002002") {
	              clearToLogin();
	            }
	            else {
	              alertError(response.message);
	            }
	          });
	        }
	      }
	      else{
	        alertError("请选择银行卡");
	      }
	    }
	    else{
	      alertError("请输入正确的还款金额");
	    }
	  }
	})



/***/ }
/******/ ]);