<?php
session_start();
require('mysql.php');

$username=$_REQUEST['username'];
$passwd=$_REQUEST['passwd'];

//$username="gqb";
//$passwd=123456;



$query_user="select * from userlogin where username = '$username' and passwd = '$passwd'";
$result =$conn->query($query_user);//验证用户
$msg=array();
if($result->num_rows){
	$row =$result->fetch_array();//取得数据库中的记录行
    $msg["status"]=1;
    $msg["user"]=$row["username"];
    $_SESSION['s_username']=$row["username"];
}else{	
 	$msg["status"]=0;
}
echo json_encode($msg);
?>