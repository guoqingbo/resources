<?php
require('mysql.php');	
$username=$_REQUEST['username'];
$tip=$_REQUEST['tip'];
$newpass=$_REQUEST['newpass'];
if($tip!=""){
	$query_user="select * from userlogin where username = '$username' and tip='$tip'";
	$result =$conn->query($query_user);
	
	if($result->num_rows){	
	 	$sql="update userlogin set passwd='$newpass' where username = '$username' and tip='$tip'";
		$result =$conn->query($sql);	
		if($result){
		    $msg='修改成功';
		}else{
		 	$msg='修改失败';
		}				
	}else{
			$msg='问题回答错误';
	}
}else{
	$msg='回答不能为空';
}
echo $msg;



?>