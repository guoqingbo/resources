<?php
session_start();
require('mysql.php');	
$username=$_REQUEST['username'];
//$username="qwert";
if(preg_match('/^[A-Za-z0-9_]{3,15}$/',$username)){	
	$query_user="select * from userlogin where username = '$username'";
	$result =$conn->query($query_user);//验证用户
	if($result->num_rows ){
	    $msg='用户名已存在';
	}else{
		$passwd=$_REQUEST['passwd'];
//		$passwd=123456;
		
		if(strlen($passwd)>=6){
			$repass=$_REQUEST['repass'];
//			$repass=123456;
			if($passwd==$repass){
				$email=$_REQUEST['email'];
//				$email="2856058001@qq.com";
				if(preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/',$email)){
					$query_user="select * from $table where email='$email'";
					$result =$conn->query($query_user);//验证用户
					if($result->num_rows ){
					    $msg='邮箱已注册';
					}else{
						$code=$_REQUEST['code'];
						$s_code=$_SESSION['code'];
						if($s_code==$code){
							$tip=isset($_REQUEST['tip'])?$_REQUEST['tip']:"";
							$insertUser="insert into userlogin (username,passwd,email,tip) values ('$username','$passwd','$email','$tip')";
						   	$result =$conn->query($insertUser);//插入数据库
							if($result){
							    $msg='注册成功';
							}else{
							 	$msg='注册失败';
							}		
						}else{
							$msg="验证码错误";
						}
					}
					
				}else{
					$msg="请输入正确的邮箱";
				}
			}else{
				$msg="密码不一致";
			}
		}else{
			$msg="密码长度要求不小于6";
		}		
	}
}else{
	$msg="用户名不符合规则";
}

echo $msg;


?>