$(function(){
	
//根据提示问题找回密码
	var tipEle={                       //邮箱内表单输入框    	
	    	username:$("#username"),   //用户名
	    	tip:$("#tip"),             //提示问题
	    	newpass:$("#newpasswd"),   //新密码
	    	repass:$("#repasswd"),     //确认密码   	
	    	btn:$("#btn_findpasswd")
    	}
//ajax判断数据库是否存在该字段
	function isexist(obj){
		var ele=obj.ele;                          //输入框
		var type=obj.type;                        //输入字段
		var successtext="输入正确";               //验证正确的返回信息
		var errortext=obj.errortext;             //验证错误的返回信息
		var value=ele.val().toLowerCase();       //输入框的值
		$.ajax({
                type: "post",
                url: "php/isexist.php",
                async: false,
                data: { type: type,
                		value:value                   		                  		
                },
                success: function (data, status) {
                	if(data==1){                    //验证成功
                		ele.nextAll("label").text(successtext).css({color:"#54b003"});
                	}else{                          //验证失败
                		ele.nextAll("label").text(errortext).css({color:"#b00052"});
                	}
                       
                },
                error: function (data) { alert(data) }               
        });          
	}
//验证用户
	function usertest(obj){
   	 	if(/^[A-Za-z0-9_]{3,15}$/.test( obj.val())){
   	 		var type="username";  	 		
   	 		isexist({
   	 			ele:obj,
   	 			type:type,
   	 			errortext:"用户不存在"
   	 		})         	                                                                      	 		
   	 	}else{
   	 		obj.nextAll("label").text("用户不存在").css({color:"#b00052"});
   	 	}
	}
   	 tipEle.username.blur(function(){
   	 	var _this=$(this);
   	 	usertest(_this)
   	 })
//提示问题验证
   	tipEle.tip.blur(function(){
   		if($(this).val()==""){
   			$(this).nextAll("label").text("回答不能为空").css({color:"#b00052"});
   		}else{
   			var type="tip";
	   	 	isexist({
	   	 			ele:$(this),
	   	 			type:type,
	   	 			errortext:"回答错误"
	   	 		})     
   		}
   	 	                        	 		
   	 })
   	  	 
//验证新密码
   	 tipEle.newpass.blur(function(){
   	 	if($(this).val().length>=6){
   	 		$(this).nextAll("label").text("新密码设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码长度应不小于6").css({color:"#b00052"});
   	 	}
   	 })
//验证密码是否一致
   	tipEle.repass.blur(function(){
   	 	if($(this).val()==$("#newpasswd").val()){
   	 		$(this).nextAll("label").text("设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码不一致").css({color:"#b00052"});
   	 	}
   	 })
   	 
// 点击找回密码  	 
	 tipEle.btn.click(function (e) {
        if (tipEle.username.val()=="") {
            alert("用户名不能为空");
            return false;
        } else if (tipEle.tip.val() == "") {
            alert("填写提示问题");
            return false;
        }else if(tipEle.newpass.val()==""){
        	alert("新密码不能为空");
            return false;
        }else if(tipEle.repass.val()!=$("#newpasswd").val()){
        	alert("密码不一致");
            return false;
        }
        else { 
            $.ajax({
                type: "post",
                url: "php/tipfindpass.php",
                async: false,
                data: { username: tipEle.username.val().toLowerCase(),
                   			 tip: tipEle.tip.val().toLowerCase(),
                   		 newpass: tipEle.newpass.val().toLowerCase(),                  		
                },
                success: function (data, status) {               	  
                	if(data=="修改成功"){
                		$(".register_form form")[0].reset();
                		alert(data);
                		window.location.href="index.html";
                	}else{
              
                		alert(data);
                	}
                       
                },
                error: function () { alert("用户名密码验证失败") }
                
            });
        }
        e.preventDefault();
    }); 
    
    
    
//根据注册邮箱找回密码
    
    var emailEle={                //邮箱内表单输入框    	
	    	username:$("#user"),   //用户名
	    	email:$("#email"),     //邮箱
	    	code:$("#code"),       //验证码
	    	sendcode:$("#btn_sendcode"),//发送验证码按钮
	    	newpass:$("#newpass"), //新密码
	    	repass:$("#repass"),    //确认密码   	
	    	btn:$("#btn_findpass")
    	}
//验证用户  
   	emailEle.username.blur(function(){  	 	
   	 	var _this=$(this);
   	 	usertest(_this);
   	 })
//验证注册邮箱
   	 emailEle.email.blur(function(){
   	 	if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test( $("#email").val())){ 
   	 		var obj=$(this);
   	 		var type="email";
   	 		isexist({
   	 			ele:obj,
   	 			type:type,
   	 			errortext:"邮箱未注册"
   	 		})     	 		  	 	                                                    	 		
   	 	}else{
   	 		$(this).nextAll("label").text("邮箱未注册").css({color:"#b00052"});
   	 	}
   	 })
   	 
 //向邮箱发送验证码
   //倒计时
	var countdown=60; 
	function settime(obj) { 
	    if (countdown <= 0) { 
	        obj.removeAttr("disabled");    
	        obj.value="发送验证码"; 
	        countdown = 60; 
	        return;
	    } else { 
	    	countdown--; 
	        obj.attr("disabled", true); 
	        obj.text("重新发送(" + countdown + ")"); 
	        
	    } 
		setTimeout(function() { 
		    settime(obj) 
		},1000)
	}
//发送验证码
   	 emailEle.sendcode.click(function(e){
   	 	if ($("#user").val()=="") {
            alert("用户名不能为空");
            return false;
        } else if ($("#email").val() == "") {
            alert("邮箱不能为空");
            return false;
        }else if($("#email").nextAll("label").text()!="输入正确"){
   	 		alert("邮箱未注册");
            return false;
   	 	}else{
   	 		var _this=$(this);
   	 
	   	 	
	   	 	$.ajax({
	                type: "post",
	                url: "php/sendmail.php",
	                async: false,
	                data: { email: $("#email").val(),                 		               		
	                },
	                success: function (data, status) { 
	                	alert(data)
	                	console.log(data);
	                	if(data==1){
	                		settime(_this);
	                		_this.nextAll("label").text("已发送，请登录邮箱查看").css({color:"#54b003"});
	                	}else{               		
	                		_this.nextAll("label").text("发送失败").css({color:"#b00052"});
	                	}                       
	                },
	                error: function () { alert("用户名密码验证失败") }
	                
	        });
   	 	}
   	 	
        e.preventDefault();
   	 })
   	  	  	 
 //验证新密码
   	 emailEle.newpass.blur(function(){
   	 	var userval=emailEle.username.val();
		var emailval=emailEle.email.val();
		var codeval=emailEle.code.val();
		
   	 	if (userval=="") {
            alert("用户名不能为空");
            return false;
        } else if (emailval == "") {
            alert("邮箱不能为空");
            return false;
        }else if(emailEle.email.nextAll("label").text()!="输入正确"){
   	 		alert("邮箱未注册");
            return false;
   	 	} else if(codeval==""){
   	 		alert("验证码不能为空");
            return false;
   	 	}
   	 	if($(this).val().length>=6){
   	 		$(this).nextAll("label").text("新密码设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码长度应不小于6").css({color:"#b00052"});
   	 	}
   	 })
 //验证密码是否一致
   	 emailEle.repass.blur(function(){
   	 	if($(this).val()==emailEle.newpass.val()){
   	 		$(this).nextAll("label").text("设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码不一致").css({color:"#b00052"});
   	 	}
   	 })
   	 
 // 点击找回密码  
   	 
	emailEle.btn.click(function (e) {
		var userval=emailEle.username.val();
		var emailval=emailEle.email.val();
		var codeval=emailEle.code.val();
		var newpassval=emailEle.newpass.val();
		var repassval=emailEle.repass.val();
		
        if (userval=="") {
            alert("用户名不能为空");
            return false;
        } else if (emailval == "") {
            alert("邮箱不能为空");
            return false;
        }else if(codeval==""){
        	alert("验证码不能为空");
            return false;
        }else if(newpassval==""){
        	alert("新密码不能为空");
            return false;
        }else if(repassval!=newpassval){
        	alert("密码不一致");
            return false;
        }
        else {
            $.ajax({
                type: "post",
                url: "php/emailfindpass.php",
                async: false,
                data: { username: userval.toLowerCase(),
                		email:emailval,
                   		code: codeval.toLowerCase(),
                   		newpass:newpassval.toLowerCase(),
                   		repass:repassval.toLowerCase()
                },
                success: function (data, status) {
                	 alert(data); 
                	if(data=="修改成功"){
                		$(".register_form form")[0].reset();
                		window.location.href="index.html";
                	}else{
                		
                	}                       
                },
                error: function () { alert("用户名密码验证失败") }
                
            });
        } 
        e.preventDefault();
    });    
})	