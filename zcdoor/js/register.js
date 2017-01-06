$(function(){
//用户注册验证

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
                	if(data==1){                    //用户存在
                		ele.nextAll("label").text(errortext).css({color:"#b00052"});//红色
                	}else{                          //用户不存在
                		ele.nextAll("label").text(successtext).css({color:"#54b003"});
                		
                	}
                       
                },
                error: function (data) { alert(data) }               
        });          
	}
//验证用户
	function usertest(obj){
   	 	if(/^[A-Za-z0-9_\u4e00-\u9fa5]{3,15}$/.test( obj.val())){
   	 		var type="username";  	 		
   	 		isexist({
   	 			ele:obj,
   	 			type:type,
   	 			errortext:"用户名已注册"
   	 		})         	                                                                      	 		
   	 	}else{
   	 		obj.nextAll("label").css({color:"#b00052"});
   	 	}
	}
   	$("#username").blur(function(){
   	 	var _this=$(this);
   	 	usertest(_this)
   	}) 
//验证密码
   	$("#passwd").blur(function(){
   	 	if($(this).val().length>=6){
   	 		$(this).nextAll("label").text("新密码设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码长度应不小于6").css({color:"#b00052"});
   	 	}
   	 })
//确认密码是否一致
   	$("#rewritepd").blur(function(){
   	 	if($(this).val()==$("#passwd").val()){
   	 		$(this).nextAll("label").text("设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码不一致").css({color:"#b00052"});
   	 	}
   	 })   	

//验证邮箱
 	 $("#email").blur(function(){
   	 	if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test( $("#email").val())){ 
   	 		var obj=$(this);
   	 		var type="email";
   	 		isexist({
   	 			ele:obj,
   	 			type:type,
   	 			errortext:"邮箱已注册"
   	 		})     	 		  	 	                                                    	 		
   	 	}else{
   	 		$(this).nextAll("label").text("请输入正确的邮箱").css({color:"#b00052"});
   	 	}
   	 })
   	  
  //点击注册
	 $(".btn_register").click(function (e) {
	 	//验证码刷新	
		$(".code img").attr("src","php/code.php?"+Math.random());		
	 	var userval=$("#username").val();
	 	var passval=$("#passwd").val();
	 	var repassval=	$("#rewritepd").val();
	 	var emailval=$("#email").val();
	 	var codeval=$("#code").val();	 	
        if (userval=="") {
            alert("用户名不能为空");
            return false;
        } else if (passval == "") {
            alert("密码不能为空");
            return false;
        }else if (repassval != passval) {
            alert("密码不一致");
            return false;
        }else if(emailval==""){
        	alert("邮箱不能为空");
            return false;
        }else if(codeval==""){
        	alert("验证码不能为空");
            return false;
        }
        else {
            $.ajax({
                type: "post",
                url: "php/register.php",
                async: false,
                data: { username:userval.toLowerCase(),
                   		passwd: passval.toLowerCase(),
                   		repass:repassval.toLowerCase(),
                   		email:emailval,
                   		tip:$("#passwd_tip").val().toLowerCase(),
                   		code:codeval.toLowerCase(),
                },
                success: function (data, status) {
                    	if(data=="注册成功"){
                    		alert(data); 
                    		window.location.href="index.html";
                    		e.preventDefault();
                    	}else{
                    		alert(data);
                    		e.preventDefault();
                    	}                        
                },
                error: function () { alert("用户名密码验证失败") }
                
            });
        }
    e.preventDefault();    
    });
    
   //验证码刷新
	$(".code img").click(function(){
		$(this).attr("src","php/code.php?"+Math.random());
	})
})	