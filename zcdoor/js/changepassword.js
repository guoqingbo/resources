$(function(){
//用户注册验证 /^[A-Za-z0-9_\u4e00-\u9fa5]{3,15}$/

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
                		ele.focus();
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
   	$("#username").blur(function(){
   	 	var _this=$(this);
   	 	usertest(_this)
   	 })

//验证密码
	$("#passwd").blur(function (e) {
		var _this=$(this);
	 	var userval=$("#username").val();
	 	var passval=_this.val();       
            $.ajax({
                type: "post",
                url: "php/login.php",
                async: false,
                dataType:"json",
                data: { 
                		username: userval,
                   		passwd: passval,
                },
                success: function (data, status) {
                    if (data.status==1) {
                        _this.nextAll("label").text("密码正确").css({color:"#54b003"});             
                    }
                    else{
                    	_this.nextAll("label").text("密码错误").css({color:"#b00052"});                   	
                    }
                },
                error: function () { alert("用户名密码验证失败") }
                
            });    
    });
   	 //验证新密码
   	 $("#newpasswd").blur(function(){
   	 	if($(this).val().length>=6){
   	 		$(this).nextAll("label").text("新密码设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码长度应不小于6").css({color:"#b00052"});
   	 	}
   	 })
//验证密码是否一致
   	$("#repass").blur(function(){
   	 	if($(this).val()==$("#newpasswd").val()){
   	 		$(this).nextAll("label").text("设置正确").css({color:"#54b003"});
   	 	}else{
   	 		$(this).nextAll("label").text("密码不一致").css({color:"#b00052"});
   	 	}
   	})
   	    	 
	 $(".btn_change").click(function (e) {
	 	var userval=$("#username").val();
	 	var passwd=$("#passwd").val();
	 	var newpass=$("#newpasswd").val();
	 	var repass=$("#repass").val();
	 	
        if (userval=="") {
            alert("用户名不能为空");
            return false;
        } else if (passwd == "") {
            alert("密码不能为空");
            return false;
        }else if(newpass==""){
        	alert("新密码不能为空");
            return false;
        }else if(repass!=newpass){
        	alert("密码不一致");
            return false;
        }
        else {
            $.ajax({
                type: "post",
                url: "php/changepassword.php",
                async: false,
                data: { username: userval.toLowerCase(),
                   		passwd: passwd.toLowerCase(),
                   		newpasswd: newpass.toLowerCase(),  
                   		repass:repass.toLowerCase()
                },
                success: function (data, status) {
                	alert(data);
                	if(data==1){
                		alert("修改成功");
                		window.location.href="index.html";              		               		
                	}else{//修改失败
						alert("修改失败");
                	}
                       
                },
                error: function () { alert("用户名密码验证失败") }
                
            });
        }
      e.preventDefault();  
    }); 
    $(".btn_reset").click(function (e) {
    	$(".register_form form")[0].reset();
//  	e.preventDefault();
    })
})	