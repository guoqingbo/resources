<?php
session_start();
require('mysql.php');	
$username=$_REQUEST['username'];
//$username="guoqingbo";
$query_user="select * from $table where username = '$username'";
$result =$conn->query($query_user);
if($result->num_rows){
	$email=$_REQUEST['email'];
//	$email="zhenchuang2016@126.com";
	$query_user="select * from $table where username = '$username' and email='$email'";
	$result =$conn->query($query_user);
	if($result->num_rows){
		$code=$_REQUEST['code'];
		$token=$_SESSION['token'];
		if($code==$token){
			$query_user="select * from $table where username = '$username' and email='$email'";
			$row=$result->fetch_array();
			$passtime=$row["passtime"];
			if(time()-$passtime>2*60*60){
				$msg='验证码过期';
			}else{
				$newpass=$_REQUEST['newpass'];
				$repass=$_REQUEST['repass'];
				if($newpass==$repass){
					$sql="update userlogin set passwd='$newpass' where username = '$username' and email='$email'";
					$result =$conn->query($sql);	
					if($result){
					    $msg='修改成功';
					}else{
					 	$msg='修改失败';
					}				
				}else{
					$msg="密码不一致";
				}
			}
			
		}else{
			$msg="验证码错误";
		}
		
	}else{
		$msg="邮箱未注册";
	}
}else{
	$msg="用户不存在";
}
echo $msg;



?>