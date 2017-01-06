<?php
session_start();
require('mysql.php');
$s_username=$_SESSION['s_username'];
//$s_username="gqb";
if($s_username!=""){
	$username=$_REQUEST['username'];
//	$username="gqb";
	if($username==$s_username){
		$passwd=$_REQUEST['passwd'];
//		$passwd="111111";
		$query_user="select * from $table where username = '$username' and passwd='$passwd'";
		$result =$conn->query($query_user);//验证用户
		if($result->num_rows ){
			$newpasswd=$_REQUEST['newpasswd'];
//			$newpasswd="111111";
			if($newpasswd!=""){
				$repass=$_REQUEST['repass'];
//				$repass="111111";
				if($newpasswd==$repass){
					$sql="update $table set passwd='$newpasswd' where username = '$username'";
					$result =$conn->query($sql);	
					if($result){
					    $msg=1;//'密码修改成功';
					}else{
					 	$msg=0;//'密码修改失败';
					}
				}else{
					$msg='密码不一致';
				}
					
			}else{
				$msg='请输入新密码';
			}				
		}else{
			$msg='密码错误';
		}
	}else{
		$msg='用户名不正确';
	}
}else{
	$msg="请先登录";
}	


echo $msg;

?>